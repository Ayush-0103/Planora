import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Flame, Target, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { fadeUp } from "@/lib/animations";

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 2.5 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 4.5 },
  { day: "Sun", hours: 1.5 },
];

const completionData = [
  { name: "Completed", value: 64 },
  { name: "Remaining", value: 36 },
];

const COLORS = ["hsl(234, 85%, 62%)", "hsl(220, 12%, 91%)"];

const consistencyData = [
  { week: "W1", days: 5 },
  { week: "W2", days: 6 },
  { week: "W3", days: 4 },
  { week: "W4", days: 7 },
];

export default function ProgressPage() {
  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" className="max-w-4xl space-y-8">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Progress</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track your study performance over time</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Hours", value: "24h", icon: Clock },
            { label: "Completion", value: "64%", icon: Target },
            { label: "This Week", value: "6/7 days", icon: TrendingUp },
            { label: "Streak", value: "7 days", icon: Flame },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i + 1} className="rounded-xl bg-card p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
              </div>
              <p className="text-xl font-semibold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div variants={fadeUp} custom={5} className="lg:col-span-2 rounded-xl bg-card p-5 shadow-card">
            <h3 className="text-sm font-medium text-foreground mb-5">Study Hours This Week</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 8%, 52%)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 8%, 52%)" }} width={24} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 12%, 91%)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 16px -4px hsl(220 12% 50% / 0.08)" }} />
                <Bar dataKey="hours" fill="hsl(234, 85%, 62%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={fadeUp} custom={6} className="rounded-xl bg-card p-5 shadow-card flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-foreground mb-4">Completion</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={completionData} cx="50%" cy="50%" innerRadius={45} outerRadius={62} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                  {completionData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p className="text-2xl font-semibold text-foreground -mt-1">64%</p>
            <p className="text-xs text-muted-foreground mt-0.5">18 of 28 topics</p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={7} className="rounded-xl bg-card p-5 shadow-card">
          <h3 className="text-sm font-medium text-foreground mb-4">Weekly Consistency</h3>
          <div className="grid grid-cols-4 gap-4">
            {consistencyData.map((w) => (
              <div key={w.week} className="text-center">
                <div className="text-lg font-semibold text-foreground">{w.days}/7</div>
                <p className="text-xs text-muted-foreground mt-0.5">{w.week}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
