import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Download, ListChecks, FileText } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { EmptyState } from "@/components/EmptyState";

const summaryCards = [
  { title: "Integration by Parts", notes: ["Use when product of two functions", "Formula: ∫u·dv = u·v − ∫v·du", "Choose u using LIATE rule"] },
  { title: "Limits & Continuity", notes: ["A function is continuous if lim f(x) = f(a)", "L'Hôpital's rule for 0/0 forms", "Squeeze theorem for bounded limits"] },
];

const formulas = ["∫ xⁿ dx = xⁿ⁺¹/(n+1) + C", "∫ eˣ dx = eˣ + C", "∫ sin(x) dx = -cos(x) + C", "∫ 1/x dx = ln|x| + C", "d/dx [sin(x)] = cos(x)", "d/dx [eˣ] = eˣ"];

export default function RevisionPage() {
  const [hasNotes] = useState(true);

  return (
    <DashboardLayout>
      {!hasNotes ? (
        <EmptyState
          icon={FileText}
          message="No revision notes available."
          buttonLabel="Generate Notes"
          buttonLink="/revision"
        />
      ) : (
        <motion.div initial="hidden" animate="visible" className="max-w-3xl space-y-8">
          <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">Revision Notes</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Mathematics — Quick review materials</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Download className="h-3 w-3" /> Download Notes
            </button>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {summaryCards.map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i + 1} className="rounded-xl bg-card p-5 shadow-card">
                <h3 className="text-sm font-medium text-foreground mb-3">{card.title}</h3>
                <ul className="space-y-2">
                  {card.notes.map((note, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ListChecks className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary/50" />{note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="rounded-xl bg-card p-5 shadow-card">
            <h3 className="text-sm font-medium text-foreground mb-4">Key Formulas</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {formulas.map((f, i) => (
                <div key={i} className="rounded-lg bg-secondary/40 px-3 py-2 text-sm font-mono text-foreground">{f}</div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
