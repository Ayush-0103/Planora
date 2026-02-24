import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Upload, Check } from "lucide-react";
import planoraLogo from "@/assets/planora-logo.png";

const steps = ["Exam Details", "Study Preferences", "Strengths & Weaknesses", "Review & Confirm"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    subject: "",
    examDate: "",
    targetScore: "",
    dailyHours: "",
    preferredTime: "",
    studyDays: "",
    weakTopics: "",
    strongTopics: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => step < 3 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <img src={planoraLogo} alt="Planora" className="h-9 w-9 object-contain" />
          <span className="text-lg font-semibold text-foreground tracking-tight">Planora</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-xs font-medium text-foreground">{steps[step]}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full gradient-primary"
              initial={false}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card overflow-hidden">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={step}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Exam Details</h2>
                    <p className="text-sm text-muted-foreground mt-1">Tell us about your upcoming exam.</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                    <input type="text" placeholder="e.g., Mathematics" value={form.subject} onChange={(e) => update("subject", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Exam Date</label>
                    <input type="date" value={form.examDate} onChange={(e) => update("examDate", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Target Score</label>
                    <input type="text" placeholder="e.g., 90%" value={form.targetScore} onChange={(e) => update("targetScore", e.target.value)} className={inputClass} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Study Preferences</h2>
                    <p className="text-sm text-muted-foreground mt-1">Help us tailor your schedule.</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Daily Available Hours</label>
                    <input type="number" min="1" max="12" placeholder="e.g., 4" value={form.dailyHours} onChange={(e) => update("dailyHours", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preferred Study Time</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Morning", "Evening"].map((t) => (
                        <button
                          key={t}
                          onClick={() => update("preferredTime", t)}
                          className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${form.preferredTime === t ? "border-primary bg-accent text-accent-foreground" : "border-border bg-background text-foreground hover:bg-secondary/40"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Study Days Per Week</label>
                    <div className="flex gap-2 flex-wrap">
                      {["5", "6", "7"].map((d) => (
                        <button
                          key={d}
                          onClick={() => update("studyDays", d)}
                          className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${form.studyDays === d ? "border-primary bg-accent text-accent-foreground" : "border-border bg-background text-foreground hover:bg-secondary/40"}`}
                        >
                          {d} days
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Strengths & Weak Areas</h2>
                    <p className="text-sm text-muted-foreground mt-1">We'll prioritize accordingly.</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Weak Topics</label>
                    <textarea placeholder="e.g., Integration, Probability" rows={2} value={form.weakTopics} onChange={(e) => update("weakTopics", e.target.value)} className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Strong Topics</label>
                    <textarea placeholder="e.g., Algebra, Trigonometry" rows={2} value={form.strongTopics} onChange={(e) => update("strongTopics", e.target.value)} className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Upload Syllabus (optional)</label>
                    <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-secondary/20 py-6 cursor-pointer hover:bg-secondary/40 transition-colors">
                      <div className="text-center">
                        <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground">Click to upload PDF or image</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Review & Confirm</h2>
                    <p className="text-sm text-muted-foreground mt-1">Double-check your details before we generate your plan.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Subject", value: form.subject },
                      { label: "Exam Date", value: form.examDate },
                      { label: "Target Score", value: form.targetScore },
                      { label: "Daily Hours", value: form.dailyHours ? `${form.dailyHours}h` : "" },
                      { label: "Preferred Time", value: form.preferredTime },
                      { label: "Days/Week", value: form.studyDays ? `${form.studyDays} days` : "" },
                      { label: "Weak Topics", value: form.weakTopics },
                      { label: "Strong Topics", value: form.strongTopics },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start justify-between rounded-xl bg-secondary/30 px-4 py-3">
                        <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                        <span className="text-sm text-foreground text-right max-w-[60%]">
                          {item.value || <span className="text-muted-foreground/50">—</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button onClick={back} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button onClick={next} className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                <Sparkles className="h-3.5 w-3.5" /> Generate My Study Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
