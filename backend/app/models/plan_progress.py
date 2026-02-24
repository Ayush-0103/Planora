from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class PlanProgress(Base):
    __tablename__ = "plan_progress"

    id = Column(Integer, primary_key=True, index=True)

    study_plan_id = Column(Integer, ForeignKey("study_plans.id"), nullable=False)
    date = Column(Date, nullable=False)

    completed = Column(Boolean, default=False)
    completion_percentage = Column(Integer, default=0)
    notes = Column(Text, nullable=True)

    study_plan = relationship("StudyPlan")