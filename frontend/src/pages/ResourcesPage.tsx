import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Search, Bookmark, ExternalLink, Play, FolderOpen } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { EmptyState } from "@/components/EmptyState";

const resources = [
  { title: "Integration by Parts — Full Tutorial", type: "video", source: "YouTube", duration: "18 min" },
  { title: "Understanding Limits Intuitively", type: "article", source: "Khan Academy" },
  { title: "Differential Equations Crash Course", type: "video", source: "YouTube", duration: "25 min" },
  { title: "Probability Cheat Sheet", type: "article", source: "Math is Fun" },
  { title: "Linear Algebra — Eigenvalues Explained", type: "video", source: "YouTube", duration: "22 min" },
  { title: "Trigonometry Formulas Reference", type: "article", source: "Wikipedia" },
];

export default function ResourcesPage() {
  const [hasResources] = useState(true);

  return (
    <DashboardLayout>
      {!hasResources ? (
        <EmptyState
          icon={FolderOpen}
          message="No saved resources yet."
        />
      ) : (
        <motion.div initial="hidden" animate="visible" className="max-w-4xl space-y-8">
          <motion.div variants={fadeUp} custom={0}>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Resources</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Curated learning materials</p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search resources..." className="w-full rounded-lg bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all shadow-card" />
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((res, i) => (
              <motion.div key={res.title} variants={fadeUp} custom={i + 2} className="rounded-xl bg-card p-4 shadow-card hover:shadow-elevated transition-shadow duration-200 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent shrink-0">
                    {res.type === "video" ? <Play className="h-3.5 w-3.5 text-accent-foreground" /> : <ExternalLink className="h-3.5 w-3.5 text-accent-foreground" />}
                  </div>
                  <button className="text-muted-foreground/40 hover:text-primary transition-colors">
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-auto">{res.title}</h3>
                <div className="flex items-center gap-2 pt-3">
                  <span className="text-xs text-muted-foreground">{res.source}</span>
                  {res.duration && <span className="text-xs text-muted-foreground">· {res.duration}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
