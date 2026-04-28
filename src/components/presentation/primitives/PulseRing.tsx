"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type PulseRingProps = {
  active?: boolean;
  className?: string;
};

export function PulseRing({ active, className }: PulseRingProps) {
  const reduce = useReducedMotion();

  if (!active || reduce) {
    return null;
  }

  return (
    <motion.span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="absolute inset-0 rounded-[inherit] ring-1 ring-sidebar-primary/40" />
      <span
        className="absolute inset-[-6px] rounded-[calc(var(--radius-xl)+6px)]"
        style={{
          animation: "pulse-ring 2.6s ease-out infinite",
          boxShadow: "0 0 0 0 color-mix(in oklab, var(--color-sidebar-primary) 45%, transparent)",
        }}
      />
    </motion.span>
  );
}
