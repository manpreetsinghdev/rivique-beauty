"use client";
import React from "react";

export function Sparkline({ data = [] }: { data?: number[] }) {
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => `${(i / (data.length - 1 || 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-16">
      <polyline fill="none" stroke="#D4A373" strokeWidth={2} points={points} />
    </svg>
  );
}
