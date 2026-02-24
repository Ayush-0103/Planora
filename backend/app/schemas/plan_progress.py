from pydantic import BaseModel
from typing import Optional
from datetime import date

class PlanProgressUpdate(BaseModel):
    completed: bool
    completion_percentage: int
    notes: Optional[str] = None


class PlanProgressResponse(BaseModel):
    id: int
    study_plan_id: int
    date: date
    completed: bool
    completion_percentage: int
    notes: Optional[str]

    class Config:
        from_attributes = True