from sqlalchemy.orm import Session
from datetime import date
import json

from app.models.study_plan import StudyPlan
from app.models.plan_progress import PlanProgress
from app.services.analytics_service import calculate_plan_analytics
from app.services.plan_generator import generate_structured_plan
from app.services.ai_service import calculate_risk_index


def adapt_study_plan(db: Session, plan_id: int):

    plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()
    if not plan:
        return {"error": "Plan not found"}

    analytics = calculate_plan_analytics(db, plan_id)
    if not analytics:
        return {"error": "No analytics available"}

    risk_index = calculate_risk_index(analytics)

    # ---------- ADAPTATION CONDITIONS ----------
    needs_adaptation = (
        analytics["completion_rate"] < 40 or
        analytics["missed_days"] > 3 or
        analytics["consistency_score"] < 50 or
        risk_index > 75
    )

    if not needs_adaptation:
        return {
            "message": "No adaptation needed",
            "risk_index": risk_index,
            "analytics": analytics
        }

    # ---------- WORKLOAD ADJUSTMENT ----------
    if risk_index > 85:
        # High risk → increase hours
        new_hours = plan.study_hours_per_day + 1
    elif analytics["completion_rate"] < 30:
        # Very low completion → reduce load
        new_hours = max(1, plan.study_hours_per_day - 1)
    else:
        new_hours = plan.study_hours_per_day

    # ---------- Dynamic Topics ----------
    # Extract topics from existing plan instead of hardcoding
    existing_plan = plan.plan_content
    if isinstance(existing_plan, str):
        existing_plan = json.loads(existing_plan)

    topics = list({
        task.split(" - ")[0]
        for day in existing_plan
        for task in day["tasks"]
        if " - " in task
    })

    if not topics:
        topics = ["Core Concepts"]

    # ---------- Regenerate Plan ----------
    new_plan = generate_structured_plan(
        exam_date=plan.exam_date,
        study_hours_per_day=new_hours,
        topics=topics,
        level=plan.level
    )

    # ---------- Update Plan ----------
    plan.study_hours_per_day = new_hours
    plan.plan_content = json.dumps(new_plan)
    plan.status = "adjusted"

    # ---------- Reset Future Progress ----------
    db.query(PlanProgress).filter(
        PlanProgress.study_plan_id == plan_id,
        PlanProgress.date >= date.today()
    ).delete()

    for day in new_plan:
        progress = PlanProgress(
            study_plan_id=plan_id,
            date=day["date"],
            completed=False,
            completion_percentage=0,
            notes=None
        )
        db.add(progress)

    db.commit()
    db.refresh(plan)

    return {
        "message": "Plan adapted successfully",
        "risk_index": risk_index,
        "new_study_hours_per_day": new_hours
    }