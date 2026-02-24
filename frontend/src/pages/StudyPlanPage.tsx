import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Check, Edit, Shuffle, CalendarPlus, Clock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { EmptyState } from "@/components/EmptyState";
import { StudyPlanSkeleton } from "@/components/LoadingStates";

const mockPlan = [
  {
    date: "Mon, Feb 24",
    tasks: [
      { topic: "Integration by Parts", duration: "1.5h", type: "study", completed: false },
      { topic: "Practice Problems Set 4", duration: "1h", type: "practice", completed: false },
      { topic: "Limits & Continuity (Review)", duration: "30min", type: "revision", completed: true },
    ],
  },
  {
    date: "Tue, Feb 25",
    tasks: [
      { topic: "Differential Equations", duration: "2h", type: "study", completed: false },
      { topic: "Trigonometric Identities", duration: "1h", type: "revision", completed: false },
    ],
  },
  {
    date: "Wed, Feb 26",
    tasks: [
      { topic: "Probability Distributions", duration: "1.5h", type: "study", completed: false },
      { topic: "Mock Test - Calculus", duration: "1h", type: "practice", completed: false },
      { topic: "Integration Formulas", duration: "30min", type: "revision", completed: false },
    ],
  },
  {
    date: "Thu, Feb 27",
    tasks: [
      { topic: "Linear Algebra Basics", duration: "2h", type: "study", completed: false },
      { topic: "Matrices & Determinants", duration: "1h", type: "practice", completed: false },
    ],
  },
];

export default function StudyPlanPage() {
  const [plan, setPlan] = useState(mockPlan);
  const hasPlan = plan.length > 0;

  const toggleTask = (dayIdx: number, taskIdx: number) => {
    const updated = [...plan];
    updated[dayIdx] = { ...updated[dayIdx], tasks: [...updated[dayIdx].tasks] };
    updated[dayIdx].tasks[taskIdx] = { ...updated[dayIdx].tasks[taskIdx], completed: !updated[dayIdx].tasks[taskIdx].completed };
    setPlan(updated);
  };

  return (
    <DashboardLayout>
      {!hasPlan ? (
        <EmptyState
          icon={CalendarDays}
          message="You don't have a study plan yet."
          buttonLabel="Create My Plan"
          buttonLink="/create-plan"
        />
      ) : (
        <motion.div initial="hidden" animate="visible" className="max-w-3xl space-y-8">
          <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">Study Plan</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Mathematics — Exam: March 15, 2026</p>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Edit, label: "Edit" },
                { icon: Shuffle, label: "Reshuffle" },
                { icon: CalendarPlus, label: "Holiday" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-card hover:bg-secondary/60 transition-colors">
                  <Icon className="h-3 w-3" /> {label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {plan.map((day, dayIdx) => (
              <motion.div key={day.date} variants={fadeUp} custom={dayIdx + 1} className="rounded-xl bg-card shadow-card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{day.date}</h3>
                </div>
                <div className="divide-y divide-border">
                  {day.tasks.map((task, taskIdx) => (
                    <div key={taskIdx} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors">
                      <button onClick={() => toggleTask(dayIdx, taskIdx)} className={cn("flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border-[1.5px] transition-all", task.completed ? "border-primary bg-primary" : "border-muted-foreground/30 hover:border-primary/60")}>
                        {task.completed && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </button>
                      <p className={cn("flex-1 text-sm", task.completed ? "text-muted-foreground line-through" : "text-foreground")}>{task.topic}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {task.type === "revision" && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">Revision</span>}
                        <span className="text-xs text-muted-foreground">{task.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
