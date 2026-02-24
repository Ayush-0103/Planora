import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Send, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { EmptyState } from "@/components/EmptyState";

const mockQuestions = [
  { id: 1, type: "mcq" as const, question: "What is the derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], correct: 0 },
  { id: 2, type: "mcq" as const, question: "Which of the following is the integral of 1/x?", options: ["x²", "ln|x| + C", "eˣ", "1/x² + C"], correct: 1 },
  { id: 3, type: "short" as const, question: "State the fundamental theorem of calculus in one sentence." },
];

export default function AssessmentPage() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hasAssessments] = useState(true);
  const mcqs = mockQuestions.filter((q) => q.type === "mcq");
  const score = submitted ? mcqs.filter((q) => selected[q.id] === q.correct).length : 0;

  return (
    <DashboardLayout>
      {!hasAssessments ? (
        <EmptyState
          icon={ClipboardCheck}
          message="No assessments taken yet."
          buttonLabel="Start First Assessment"
          buttonLink="/assessments"
        />
      ) : (
        <motion.div initial="hidden" animate="visible" className="max-w-xl mx-auto space-y-6">
          <motion.div variants={fadeUp} custom={0}>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Assessment</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Calculus — Chapter 3: Integration</p>
          </motion.div>

          <div className="space-y-4">
            {mockQuestions.map((q, i) => (
              <motion.div key={q.id} variants={fadeUp} custom={i + 1} className="rounded-xl bg-card p-5 shadow-card">
                <p className="text-sm font-medium text-foreground mb-3">
                  <span className="text-muted-foreground mr-1.5">{q.id}.</span>{q.question}
                </p>
                {q.type === "mcq" && q.options ? (
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => !submitted && setSelected({ ...selected, [q.id]: optIdx })}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                          selected[q.id] === optIdx
                            ? submitted
                              ? optIdx === q.correct ? "bg-success/10 text-foreground" : "bg-destructive/10 text-foreground"
                              : "bg-accent text-foreground"
                            : "hover:bg-secondary/40 text-foreground"
                        )}
                      >
                        {selected[q.id] === optIdx ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" /> : <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />}
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea placeholder="Type your answer here..." rows={2} className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none" />
                )}
              </motion.div>
            ))}
          </div>

          {!submitted ? (
            <motion.button variants={fadeUp} custom={mockQuestions.length + 1} onClick={() => setSubmitted(true)} className="w-full flex items-center justify-center gap-2 rounded-lg gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Send className="h-3.5 w-3.5" /> Submit
            </motion.button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card p-5 shadow-card text-center">
              <p className="text-2xl font-semibold text-foreground">{score}/{mcqs.length}</p>
              <p className="text-sm text-muted-foreground mt-1">{score === mcqs.length ? "Perfect score! 🎉" : "Keep practicing!"}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  );
}
