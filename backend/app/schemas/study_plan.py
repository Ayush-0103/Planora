from pydantic import BaseModel
from datetime import date
from typing import List

class StudyPlanCreate(BaseModel):
    exam_name: str
    subject: str
    exam_date: date
    study_hours_per_day: int
    level: str
    topics: List[str]  # NEW

class StudyPlanResponse(BaseModel):
    id: int
    exam_name: str
    subject: str
    exam_date: date
    study_hours_per_day: int
    level: str
    status: str

    class Config:
        from_attributes = True