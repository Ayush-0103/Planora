from sqlalchemy.orm import Session
from app.models.plan_progress import PlanProgress
from app.models.study_plan import StudyPlan
from datetime import date

def calculate_plan_analytics(db: Session, plan_id: int):
    progress_entries = db.query(PlanProgress).filter(
        PlanProgress.study_plan_id == plan_id
    ).all()

    if not progress_entries:
        return None

    total_days = len(progress_entries)
    completed_days = sum(1 for p in progress_entries if p.completed)
    missed_days = sum(1 for p in progress_entries if not p.completed and p.date < date.today())

    average_percentage = (
        sum(p.completion_percentage for p in progress_entries) // total_days
    )

    completion_rate = (completed_days / total_days) * 100

    # Basic consistency score logic
    consistency_score = int((average_percentage * 0.6) + (completion_rate * 0.4))

    return {
        "total_days": total_days,
        "completed_days": completed_days,
        "completion_rate": round(completion_rate, 2),
        "average_percentage": average_percentage,
        "missed_days": missed_days,
        "consistency_score": consistency_score
    }