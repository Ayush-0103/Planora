from datetime import date, timedelta

def generate_structured_plan(exam_date: date, study_hours_per_day: int, topics: list, level: str):
    today = date.today()
    total_days = (exam_date - today).days

    if total_days <= 0:
        return []

    # Reserve last 5 days for revision
    revision_days = min(5, total_days // 4)
    study_days = total_days - revision_days

    if study_days <= 0:
        study_days = total_days
        revision_days = 0

    plan = []
    topic_index = 0
    topics_count = len(topics)

    # --- Topic Distribution Phase ---
    for i in range(study_days):
        current_date = today + timedelta(days=i)
        topic = topics[topic_index % topics_count]

        # Adaptive Task Logic
        if level.lower() == "beginner":
            tasks = [
                f"{topic} - Detailed Concept Study",
                f"{topic} - Guided Examples",
                f"{topic} - Basic Practice Problems",
                "Short Revision of Previous Topic"
            ]

        elif level.lower() == "intermediate":
            tasks = [
                f"{topic} - Concept Refresh",
                f"{topic} - Mixed Practice Questions",
                f"{topic} - Previous Year Questions",
                "Quick Revision"
            ]

        elif level.lower() == "advanced":
            tasks = [
                f"{topic} - Rapid Concept Review",
                f"{topic} - Hard Problems",
                f"{topic} - Timed Practice Session",
                "Analyze Weak Areas"
            ]

            # Insert weekly mock test every 7 days
            if i % 7 == 6:
                tasks.append("Full-Length Mock Test")

        else:
            tasks = [
                f"{topic} - Concept Study",
                f"{topic} - Practice Problems",
                "Quick Revision"
            ]

        plan.append({
            "date": str(current_date),
            "tasks": tasks
        })

        topic_index += 1

    # --- Final Revision Phase ---
    for i in range(revision_days):
        current_date = today + timedelta(days=study_days + i)

        plan.append({
            "date": str(current_date),
            "tasks": [
                "Full Syllabus Revision",
                "Mock Test Practice",
                "Analyze Weak Areas"
            ]
        })

    return plan