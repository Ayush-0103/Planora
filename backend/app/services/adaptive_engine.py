from sqlalchemy.orm import Session
from datetime import date
from app.models.study_plan import StudyPlan
from app.models.plan_progress import PlanProgress
from app.services.analytics_service import calculate_plan_analytics
from app.services.plan_generator import generate_structured_plan
import json

def adapt_study_plan(db: Session, plan_id: int):

    analytics = calculate_plan_analytics(db, plan_id)

    if not analytics:
        return None

    plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()

    if not plan:
        return None

    # Check if adaptation needed
    if (
        analytics["completion_rate"] < 40 or
        analytics["missed_days"] > 3 or
        analytics["consistency_score"] < 50
    ):
        # Reduce workload but not below 1
        new_hours = max(1, plan.study_hours_per_day - 1)
        topics = ["Algebra", "Calculus", "Trigonometry", "Probability"]
        # Generate new structured plan
        new_plan = generate_structured_plan(
    exam_date=plan.exam_date,
    study_hours_per_day=new_hours,
    topics=topics,
    level=plan.level
)

        plan.study_hours_per_day = new_hours
        plan.plan_content = json.dumps(new_plan)
        plan.status = "adjusted"

        # Reset progress
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
            "new_study_hours_per_day": new_hours
        }

    return {
        "message": "No adaptation needed",
        "analytics": analytics
    }