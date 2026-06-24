"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message:   string;
  variant?:  ToastVariant;
  duration?: number;
  onDismiss: () => void;
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: "bg-emerald-600",
  error:   "bg-red-600",
  info:    "bg-neutral-800",
};

export function Toast({ message, variant = "info", duration = 4000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onDismiss(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-lg px-5 py-3 text-sm text-white shadow-lg transition-opacity",
        VARIANT_CLASSES[variant],
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {message}
    </div>
  );
}
