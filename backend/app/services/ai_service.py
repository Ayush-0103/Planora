import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from sqlalchemy.orm import Session

from app.models.study_plan import StudyPlan
from app.services.analytics_service import calculate_plan_analytics

load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def calculate_risk_index(analytics: dict) -> float:
    """
    Risk score out of 100.
    Higher = more dangerous situation.
    """

    score = 100

    score -= analytics["completion_rate"] * 0.5
    score -= analytics["consistency_score"] * 0.3
    score -= analytics["missed_days"] * 2

    return round(max(0, min(100, score)), 2)


def build_ai_context(plan: StudyPlan, analytics: dict, risk_index: float) -> str:
    """
    Build structured intelligence context for AI.
    """

    return f"""
You are Planora's Academic Intelligence Engine.

IMPORTANT RULES:
- Only analyze based on provided data.
- Do NOT invent syllabus topics.
- Do NOT assume extra performance data.
- Base all reasoning strictly on plan and analytics.

============================

STUDENT PLAN DATA:
- Exam Name: {plan.exam_name}
- Subject: {plan.subject}
- Exam Date: {plan.exam_date}
- Study Hours Per Day: {plan.study_hours_per_day}
- Level: {plan.level}

PERFORMANCE ANALYTICS:
- Completion Rate: {analytics["completion_rate"]}%
- Total Completed Days: {analytics["completed_days"]}
- Missed Days: {analytics["missed_days"]}
- Consistency Score: {analytics["consistency_score"]}
- Plan Risk Index: {risk_index}/100

PLAN STRUCTURE (JSON):
{json.dumps(plan.plan_content, indent=2)}

============================

Generate response in this structured format:

1. Performance Diagnosis
2. Risk Level Analysis
3. Tactical Improvement Plan (Realistic + Data-driven)
4. Strategic Adjustment Suggestion
5. Motivational Message grounded in current reality

Keep response concise but intelligent.
"""
    

def generate_ai_feedback(db: Session, plan_id: int):
    """
    Generate intelligent AI feedback based on analytics + real plan data.
    """

    plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()

    if not plan:
        return {"error": "Study plan not found"}

    analytics = calculate_plan_analytics(db, plan_id)

    if not analytics:
        return {"error": "No analytics data available"}

    risk_index = calculate_risk_index(analytics)

    context_prompt = build_ai_context(plan, analytics, risk_index)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a strict but intelligent academic performance analyst."
                },
                {
                    "role": "user",
                    "content": context_prompt
                }
            ],
            temperature=0.3,  # Lower = less hallucination
        )

        return {
            "ai_feedback": response.choices[0].message.content,
            "risk_index": risk_index
        }

    except Exception as e:
        return {
            "error": str(e)
        }