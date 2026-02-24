import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/animations";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export function EmptyState({ icon: Icon, message, buttonLabel, buttonLink }: EmptyStateProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={0}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-5">
        <Icon className="h-6 w-6 text-muted-foreground/60" />
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      {buttonLabel && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {buttonLabel}
        </Link>
      )}
    </motion.div>
  );
}
