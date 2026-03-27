import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant?: "ganho" | "despesa" | "destaque" | "info";
}

const cardStyles = {
  ganho: {
    bg: "bg-ganho-bg",
    icon: "bg-ganho/15 text-ganho",
    value: "text-foreground",
    border: "border-ganho/15",
    subtitle: "text-ganho",
  },
  despesa: {
    bg: "bg-despesa-bg",
    icon: "bg-despesa/15 text-despesa",
    value: "text-foreground",
    border: "border-despesa/15",
    subtitle: "text-despesa",
  },
  destaque: {
    bg: "bg-secondary",
    icon: "bg-primary/10 text-primary",
    value: "text-foreground",
    border: "border-border",
    subtitle: "text-muted-foreground",
  },
  info: {
    bg: "bg-info-bg",
    icon: "bg-info/15 text-info",
    value: "text-foreground",
    border: "border-info/15",
    subtitle: "text-info",
  },
};

export function MetricCard({ label, value, subtitle, icon, variant = "destaque" }: MetricCardProps) {
  const styles = cardStyles[variant];

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "rounded-xl p-4 border bg-card transition-shadow",
        styles.border
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", styles.icon)}>
          {icon}
        </div>
      </div>
      <div className={cn("text-xl font-semibold tracking-tight tabular-nums", styles.value)}>
        {value}
      </div>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      {subtitle && (
        <p className={cn("text-xs font-medium mt-2", styles.subtitle)}>{subtitle}</p>
      )}
    </motion.div>
  );
}
