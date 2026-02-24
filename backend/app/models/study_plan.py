from sqlalchemy import Column, Integer, String, Date, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class StudyPlan(Base):
    __tablename__ = "study_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    exam_name = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    exam_date = Column(Date, nullable=False)
    study_hours_per_day = Column(Integer, nullable=False)
    level = Column(String, nullable=False)

    plan_content = Column(Text, nullable=True)
    status = Column(String, default="active")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User")