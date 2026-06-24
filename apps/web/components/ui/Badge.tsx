import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100  text-amber-700",
  error:   "bg-red-100    text-red-700",
  info:    "bg-blue-100   text-blue-700",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", VARIANT_CLASSES[variant], className)}>
      {label}
    </span>
  );
}
