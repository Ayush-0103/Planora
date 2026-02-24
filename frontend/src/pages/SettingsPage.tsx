import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X, Mail } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const notifToggles = [
  { key: "dailyReminder", label: "Daily Study Reminder", defaultOn: true },
  { key: "planSummary", label: "Daily Plan Summary", defaultOn: true },
  { key: "missedAlert", label: "Missed Study Alert", defaultOn: false },
  { key: "weeklyReport", label: "Weekly Progress Report", defaultOn: true },
];

export default function SettingsPage() {
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(notifToggles.map((n) => [n.key, n.defaultOn]))
  );
  const [reminderTime, setReminderTime] = useState("08:00");
  const [showPreview, setShowPreview] = useState(false);

  const toggleNotif = (key: string) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" className="max-w-xl mx-auto space-y-8">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your profile and preferences</p>
        </motion.div>

        {/* Profile */}
        <motion.div variants={fadeUp} custom={1} className="rounded-xl bg-card p-5 shadow-card space-y-4">
          <h3 className="text-sm font-medium text-foreground">Profile</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Full Name</label>
              <input type="text" defaultValue="Alex Johnson" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input type="email" defaultValue="alex@example.com" className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Education Level</label>
            <select className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all appearance-none">
              <option>Undergraduate</option>
              <option>High School</option>
              <option>Postgraduate</option>
            </select>
          </div>
        </motion.div>

        {/* Study Preferences */}
        <motion.div variants={fadeUp} custom={2} className="rounded-xl bg-card p-5 shadow-card space-y-4">
          <h3 className="text-sm font-medium text-foreground">Study Preferences</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Preferred Study Time</label>
              <select className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all appearance-none">
                <option>Morning (6 AM – 12 PM)</option>
                <option>Afternoon (12 PM – 6 PM)</option>
                <option>Evening (6 PM – 12 AM)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Daily Study Goal</label>
              <input type="number" defaultValue={4} className="w-full rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all" />
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div variants={fadeUp} custom={3} className="rounded-xl bg-card p-5 shadow-card space-y-5">
          <h3 className="text-sm font-medium text-foreground">Notification Preferences</h3>

          {/* Email toggles */}
          <div className="space-y-3">
            {notifToggles.map((item) => (
              <label key={item.key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">{item.label}</span>
                <button
                  type="button"
                  onClick={() => toggleNotif(item.key)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${notifs[item.key] ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${notifs[item.key] ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </label>
            ))}
          </div>

          {/* Reminder Time */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Reminder Time</label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full max-w-[180px] rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
          </div>

          {/* User Email (read-only) */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Notification Email</label>
            <input
              type="email"
              value="alex@example.com"
              readOnly
              className="w-full rounded-lg border border-border bg-secondary/30 py-2 px-3 text-sm text-muted-foreground cursor-default focus:outline-none"
            />
          </div>

          {/* Preview button */}
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/40 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" /> Preview Sample Reminder
          </button>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} className="flex gap-3">
          <button className="flex-1 rounded-lg gradient-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Save Changes
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-card px-4 py-2 text-sm font-medium text-destructive shadow-card hover:bg-destructive/5 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </motion.div>
      </motion.div>

      {/* Sample Reminder Modal */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-elevated"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Sample Daily Reminder</h3>
                <button onClick={() => setShowPreview(false)} className="rounded-lg p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-xl bg-secondary/30 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>From: reminders@planora.app</span>
                </div>
                <div className="text-xs text-muted-foreground">To: alex@example.com</div>
                <div className="h-px bg-border" />
                <p className="text-sm font-medium text-foreground">📚 Your daily study plan is ready!</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hi Alex, here's your study plan for today:
                </p>
                <ul className="space-y-1.5 text-sm text-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    9:00 AM — Integration by Parts (1.5h)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    11:00 AM — Electromagnetic Waves (1h)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    2:00 PM — Organic Reactions (1h)
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground pt-1">Stay consistent. You've got this! 💪</p>
              </div>

              <button
                onClick={() => setShowPreview(false)}
                className="mt-4 w-full rounded-lg gradient-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Close Preview
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
