import { motion } from "framer-motion";

export function StudyPlanSkeleton() {
  return (
    <div className="max-w-3xl space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-32 rounded-lg bg-secondary" />
          <div className="h-3 w-48 rounded-lg bg-secondary mt-2" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Generating your personalized plan...</p>
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="h-3 w-24 rounded bg-secondary" />
          </div>
          <div className="divide-y divide-border">
            {[1, 2].map((j) => (
              <div key={j} className="flex items-center gap-3 px-4 py-3">
                <div className="h-4 w-4 rounded border border-secondary bg-secondary" />
                <div className="h-3 flex-1 rounded bg-secondary" />
                <div className="h-3 w-12 rounded bg-secondary" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RevisionSkeleton() {
  return (
    <div className="max-w-3xl space-y-6 animate-pulse">
      <div>
        <div className="h-5 w-36 rounded-lg bg-secondary" />
        <div className="h-3 w-52 rounded-lg bg-secondary mt-2" />
      </div>
      <p className="text-sm text-muted-foreground">Generating revision notes...</p>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl bg-card p-5 shadow-card space-y-3">
            <div className="h-4 w-32 rounded bg-secondary" />
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-3 w-full rounded bg-secondary" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <motion.div
        className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
