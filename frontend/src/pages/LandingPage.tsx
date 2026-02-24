import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, RotateCcw, BarChart3, ArrowRight,
  CalendarClock, Shuffle, ClipboardCheck, FileText,
  CalendarOff, TrendingUp, Moon, Sun,
} from "lucide-react";
import { fadeUpLanding as fadeUp } from "@/lib/animations";
import planoraLogo from "@/assets/planora-logo.png";

const features = [
  {
    icon: Brain,
    title: "Adaptive Study Plans",
    description: "AI generates structured daily plans tailored to your goals and timeline.",
  },
  {
    icon: RotateCcw,
    title: "Intelligent Revision Cycles",
    description: "Automatic spaced revision ensures long-term retention.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Progress Tracking",
    description: "Visual insights help you stay consistent and improve performance.",
  },
];

const benefits = [
  { icon: CalendarClock, title: "Personalized AI study scheduling", description: "Custom schedules that adapt to your unique learning pace and availability." },
  { icon: Shuffle, title: "Dynamic plan reshuffling", description: "Missed a day? Planora automatically adjusts your plan to keep you on track." },
  { icon: ClipboardCheck, title: "Topic-based assessments", description: "Test your knowledge with targeted quizzes aligned to your study plan." },
  { icon: FileText, title: "Instant revision notes generator", description: "Auto-generated summaries and key points for quick review sessions." },
  { icon: CalendarOff, title: "Holiday & availability adjustments", description: "Set holidays and breaks — your plan adapts around your life." },
  { icon: TrendingUp, title: "Performance analytics dashboard", description: "Track hours, streaks, and completion rates with clear visual reports." },
];

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-lg font-bold text-foreground tracking-tight">Planora</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/login" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link to="/signup" className="rounded-xl gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-32 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-5xl sm:text-[56px] font-bold text-foreground tracking-tight leading-[1.1]"
            >
              Plan Smarter.
              <br />
              <span className="bg-gradient-to-r from-primary to-[hsl(250,75%,66%)] bg-clip-text text-transparent">
                Perform Better.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Planora is an AI-powered adaptive study planner that builds personalized study strategies based on your exam date, strengths, and daily availability.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8 flex items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
              >
                Login
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} custom={3} className="mt-6 text-xs text-muted-foreground">
              Built for focused learners and exam achievers.
            </motion.p>
          </div>

          {/* Right — Dashboard Mockup */}
          <motion.div variants={fadeUp} custom={2} className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated">
                {/* Mock navbar */}
                <div className="flex items-center gap-3 mb-6">
                  <img src={planoraLogo} alt="" className="h-6 w-6 object-contain" />
                  <span className="text-xs font-semibold text-foreground">Planora</span>
                  <div className="ml-auto flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <div className="h-2 w-2 rounded-full bg-warning" />
                  </div>
                </div>
                {/* Mock stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Study Hours", value: "24h" },
                    { label: "Streak", value: "7 days" },
                    { label: "Completed", value: "68%" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-secondary/40 p-3 text-center">
                      <p className="text-lg font-bold text-foreground">{s.value}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Mock tasks */}
                <div className="space-y-2.5">
                  {["Physics — Wave Optics", "Math — Calculus", "Chemistry — Organic"].map((t, i) => (
                    <div key={t} className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-success" : i === 1 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                      <span className="text-xs text-foreground font-medium">{t}</span>
                      <span className="ml-auto text-[11px] text-muted-foreground">{i === 0 ? "Done" : i === 1 ? "In Progress" : "Upcoming"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/4 blur-3xl -z-10" />
      </section>

      {/* Features */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center"
          >
            Smarter way to prepare.
          </motion.h2>
          <motion.div className="grid gap-6 md:grid-cols-3 mt-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i + 1}
                className="group rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent mb-5">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Planora */}
      <section className="px-6 py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center"
            >
              Why Choose Planora?
            </motion.h2>
            <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className="flex gap-4 items-start rounded-2xl bg-card border border-border p-6 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                    <b.icon className="h-4.5 w-4.5 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Positioning */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="w-16 h-px bg-border mx-auto mb-8" />
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight"
          >
            Built for serious learners.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-muted-foreground leading-relaxed"
          >
            Planora combines artificial intelligence with structured learning science to create adaptive study systems that evolve with your progress. It's not just a planner — it's your exam strategy engine.
          </motion.p>
          <div className="w-16 h-px bg-border mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pt-8 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto rounded-3xl gradient-primary p-12 sm:p-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight"
          >
            Start planning your success today.
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-opacity"
            >
              Get Started with Planora <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Planora</span>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 Planora. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
