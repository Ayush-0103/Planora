import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Upload, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export default function CreatePlanPage() {
  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" className="max-w-xl mx-auto space-y-8">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Create Study Plan</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Let AI generate a personalized study schedule</p>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="rounded-xl bg-card p-6 shadow-card space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
            <input type="text" placeholder="e.g., Mathematics" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Exam Date</label>
              <input type="date" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Education Level</label>
              <select className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all appearance-none">
                <option value="">Select level</option>
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Competitive Exam</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Daily Available Hours</label>
            <input type="number" min="1" max="12" placeholder="e.g., 4" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Weak Topics</label>
            <textarea placeholder="e.g., Integration, Probability" rows={2} className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Upload Syllabus (optional)</label>
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-secondary/20 py-5 cursor-pointer hover:bg-secondary/40 transition-colors">
              <div className="text-center">
                <Upload className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Click to upload</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Holidays / Off Days</label>
            <input type="date" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 rounded-lg gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity mt-1">
            <Sparkles className="h-3.5 w-3.5" /> Generate Study Plan
          </button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
