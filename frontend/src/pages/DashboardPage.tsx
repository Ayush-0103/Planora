import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, Clock, Target, Flame, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const stats = [
  { label: "Study Hours", value: "24.5h", change: "+3.2h this week", icon: Clock },
  { label: "Topics Covered", value: "18", change: "+4 this week", icon: BookOpen },
  { label: "Completion", value: "64%", change: "+8% this week", icon: Target },
  { label: "Day Streak", value: "7", change: "Best: 12", icon: Flame },
];

const upcomingTasks = [
  { subject: "Mathematics", topic: "Integration by Parts", time: "9:00 AM", duration: "1.5h", revision: false },
  { subject: "Physics", topic: "Electromagnetic Waves", time: "11:00 AM", duration: "1h", revision: false },
  { subject: "Chemistry", topic: "Organic Reactions", time: "2:00 PM", duration: "1h", revision: true },
  { subject: "Mathematics", topic: "Differential Equations", time: "4:00 PM", duration: "1.5h", revision: false },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" className="max-w-4xl space-y-8">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Good morning, Alex</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Here's your study overview for today</p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i + 1} className="rounded-xl bg-card p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Today's Plan */}
        <motion.div variants={fadeUp} custom={5}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">Today's Study Plan</h2>
            <span className="text-xs text-muted-foreground">Feb 24, 2026</span>
          </div>
          <div className="rounded-xl bg-card shadow-card divide-y divide-border overflow-hidden">
            {upcomingTasks.map((task, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 6} className="flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{task.topic}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.subject}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {task.revision && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">Revision</span>
                  )}
                  <div className="text-right">
                    <p className="text-sm text-foreground">{task.time}</p>
                    <p className="text-xs text-muted-foreground">{task.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={fadeUp} custom={10} className="flex gap-3">
          <a href="/create-plan" className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            <TrendingUp className="h-3.5 w-3.5" /> Create New Plan
          </a>
          <a href="/assessments" className="inline-flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-sm font-medium text-foreground shadow-card hover:bg-secondary/60 transition-colors">
            Take Assessment
          </a>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
