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
    icon: "bg-ganho/10 text-ganho",
    value: "text-foreground",
    border: "border-ganho/10",
  },
  despesa: {
    bg: "bg-despesa-bg",
    icon: "bg-despesa/10 text-despesa",
    value: "text-foreground",
    border: "border-despesa/10",
  },
  destaque: {
    bg: "bg-destaque-bg",
    icon: "bg-destaque/10 text-destaque",
    value: "text-foreground",
    border: "border-destaque/10",
  },
  info: {
    bg: "bg-info-bg",
    icon: "bg-info/10 text-info",
    value: "text-foreground",
    border: "border-info/10",
  },
};

export function MetricCard({ label, value, subtitle, icon, variant = "destaque" }: MetricCardProps) {
  const styles = cardStyles[variant];

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "rounded-2xl p-5 border transition-shadow",
        styles.bg,
        styles.border
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", styles.icon)}>
          {icon}
        </div>
      </div>
      <div className={cn("text-2xl font-bold tracking-tight tabular-nums", styles.value)}>
        {value}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      {subtitle && (
        <p className="text-xs text-ganho font-medium mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
}
