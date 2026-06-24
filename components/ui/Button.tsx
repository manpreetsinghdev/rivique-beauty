import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "luxury";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  luxury:    "btn-luxury",
};

const sizeOverride: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[0.65rem]",
  md: "",
  lg: "px-12 py-5 text-xs",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variantClass[variant],
        size !== "md" && sizeOverride[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
