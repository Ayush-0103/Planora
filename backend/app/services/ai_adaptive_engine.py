import os
import json
from datetime import date, timedelta
from dotenv import load_dotenv
from openai import OpenAI
from sqlalchemy.orm import Session

from app.models.study_plan import StudyPlan
from app.models.plan_progress import PlanProgress
from app.services.analytics_service import calculate_plan_analytics
from app.services.ai_service import calculate_risk_index

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def build_partial_adaptive_prompt(plan, analytics, risk_index, next_7_days):

    return f"""
You are Planora Professional Adaptive Engine.

STRICT RULES:
- Return ONLY valid JSON.
- Do NOT explain anything.
- Do NOT use markdown.
- Only restructure provided days.
- Keep dates unchanged.
- Do NOT invent new subjects.

FORMAT:
[
  {{
    "date": "YYYY-MM-DD",
    "tasks": ["task1", "task2"]
  }}
]

========================

Subject: {plan.subject}
Exam Date: {plan.exam_date}
Study Hours Per Day: {plan.study_hours_per_day}
Level: {plan.level}

Analytics:
Completion Rate: {analytics["completion_rate"]}
Missed Days: {analytics["missed_days"]}
Consistency Score: {analytics["consistency_score"]}
Risk Index: {risk_index}

Restructure ONLY these upcoming 7 days:

{json.dumps(next_7_days, indent=2)}
"""


def adapt_study_plan_with_ai(db: Session, plan_id: int):

    plan = db.query(StudyPlan).filter(StudyPlan.id == plan_id).first()
    if not plan:
        return {"error": "Plan not found"}

    analytics = calculate_plan_analytics(db, plan_id)
    if not analytics:
        return {"error": "No analytics available"}

    risk_index = calculate_risk_index(analytics)

    plan_content = plan.plan_content
    if isinstance(plan_content, str):
        plan_content = json.loads(plan_content)

    today = date.today()

    past_days = []
    next_7_days = []
    future_days = []

    for day in plan_content:
        day_date = date.fromisoformat(day["date"])

        if day_date < today:
            past_days.append(day)
        elif today <= day_date < today + timedelta(days=7):
            next_7_days.append(day)
        else:
            future_days.append(day)

    if not next_7_days:
        return {"message": "No upcoming days to adapt"}

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a strict academic restructuring engine."},
                {"role": "user", "content": build_partial_adaptive_prompt(plan, analytics, risk_index, next_7_days)}
            ],
            temperature=0.2
        )

        ai_output = response.choices[0].message.content.strip()

        # Clean markdown if present
        ai_output = ai_output.replace("```json", "").replace("```", "").strip()

        new_7_days = json.loads(ai_output)

        if not isinstance(new_7_days, list):
            return {"error": "Invalid AI response format"}

        # Merge plan
        updated_plan = past_days + new_7_days + future_days

        plan.plan_content = json.dumps(updated_plan)
        plan.status = "ai_adjusted_partial"

        # Reset only upcoming 7 days progress
        db.query(PlanProgress).filter(
            PlanProgress.study_plan_id == plan_id,
            PlanProgress.date >= today,
            PlanProgress.date < today + timedelta(days=7)
        ).delete()

        for day in new_7_days:
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
            "message": "Partial AI adaptation successful",
            "risk_index": risk_index
        }

    except Exception as e:
        return {"error": str(e)}