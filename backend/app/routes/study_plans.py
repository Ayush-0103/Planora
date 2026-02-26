from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import json
from fastapi import HTTPException
from app.models.plan_progress import PlanProgress
from datetime import datetime
from app.schemas.plan_progress import PlanProgressUpdate, PlanProgressResponse
from app.database import get_db
from app.models.study_plan import StudyPlan
from app.schemas.study_plan import StudyPlanCreate, StudyPlanResponse
from app.utils.security import get_current_user
from app.models.user import User
from app.services.plan_generator import generate_structured_plan
from app.services.analytics_service import calculate_plan_analytics
from app.services.adaptive_engine import adapt_study_plan
from app.services.ai_service import generate_ai_feedback
from app.services.ai_adaptive_engine import adapt_study_plan_with_ai

router = APIRouter(prefix="/plans", tags=["Study Plans"])


@router.post("/", response_model=StudyPlanResponse)
def create_study_plan(
    plan_data: StudyPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    generated_plan = generate_structured_plan(
    exam_date=plan_data.exam_date,
    study_hours_per_day=plan_data.study_hours_per_day,
    topics=plan_data.topics,
    level=plan_data.level
)

    new_plan = StudyPlan(
        user_id=current_user.id,
        exam_name=plan_data.exam_name,
        subject=plan_data.subject,
        exam_date=plan_data.exam_date,
        study_hours_per_day=plan_data.study_hours_per_day,
        level=plan_data.level,
        plan_content=json.dumps(generated_plan),
        status="active"
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    from datetime import datetime

    parsed_plan = json.loads(new_plan.plan_content)

    for day in parsed_plan:
        progress_entry = PlanProgress(
            study_plan_id=new_plan.id,
            date=datetime.strptime(day["date"], "%Y-%m-%d").date()
        )
        db.add(progress_entry)

    db.commit()
    

    return new_plan



@router.get("/", response_model=List[StudyPlanResponse])
def get_my_study_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plans = db.query(StudyPlan).filter(
        StudyPlan.user_id == current_user.id
    ).all()

    return plans
@router.get("/{plan_id}")
def get_single_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    return {
        "id": plan.id,
        "exam_name": plan.exam_name,
        "subject": plan.subject,
        "exam_date": plan.exam_date,
        "study_hours_per_day": plan.study_hours_per_day,
        "level": plan.level,
        "status": plan.status,
        "plan_content": json.loads(plan.plan_content) if plan.plan_content else []
    }
@router.patch("/progress/{progress_id}", response_model=PlanProgressResponse)
def update_progress(
    progress_id: int,
    update_data: PlanProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    progress = db.query(PlanProgress).filter(
        PlanProgress.id == progress_id
    ).first()

    if not progress:
        raise HTTPException(status_code=404, detail="Progress entry not found")

    # Ensure user owns this plan
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == progress.study_plan_id,
        StudyPlan.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=403, detail="Not authorized")

    progress.completed = update_data.completed
    progress.completion_percentage = update_data.completion_percentage
    progress.notes = update_data.notes

    db.commit()
    db.refresh(progress)

    return progress
@router.get("/{plan_id}/analytics")
def get_plan_analytics(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    analytics = calculate_plan_analytics(db, plan_id)

    if not analytics:
        raise HTTPException(status_code=404, detail="No progress data found")

    return analytics

@router.post("/{plan_id}/adapt")
def adapt_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    result = adapt_study_plan(db, plan_id)

    if not result:
        raise HTTPException(status_code=400, detail="Adaptation failed")

    return result
@router.post("/{plan_id}/ai-feedback")
def ai_feedback(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan = db.query(StudyPlan).filter(
        StudyPlan.id == plan_id,
        StudyPlan.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    feedback = generate_ai_feedback(db, plan_id)

    return {"ai_feedback": feedback}
@router.post("/{plan_id}/ai-adapt")
def ai_adapt_plan(plan_id: int, db: Session = Depends(get_db)):
    return adapt_study_plan_with_ai(db, plan_id)