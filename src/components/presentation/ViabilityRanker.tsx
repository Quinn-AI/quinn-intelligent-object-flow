"use client";

import { motion } from "motion/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { isViabilityPhase, viabilityRows, type OrchestrationPhaseId } from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

type ViabilityRankerProps = {
  phase: OrchestrationPhaseId;
};

export function ViabilityRanker({ phase }: ViabilityRankerProps) {
  const active = isViabilityPhase(phase);

  return (
    <Card
      className={cn(
        "border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-500",
        active &&
          "ring-1 ring-sidebar-primary/50 shadow-[0_18px_60px_-28px_color-mix(in_oklab,var(--color-sidebar-primary)_30%,transparent)]"
      )}
    >
      <CardHeader className="pb-2">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Prioritization
        </p>
        <CardTitle className="text-base">Viability scoring</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Each intelligent object is graded 0–100 for completion confidence given calendars, fleet fit,
          and data readiness.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {viabilityRows.map((row) => (
          <div key={row.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="font-medium leading-snug">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.note}</p>
              </div>
              <motion.span
                key={`${row.label}-${active}`}
                className="font-mono text-lg font-semibold tabular-nums"
                initial={active ? { opacity: 0.4, y: 4 } : false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {row.score}
              </motion.span>
            </div>
            <Progress
              value={active ? row.score : Math.round(row.score * 0.62)}
              className={cn("h-1.5 transition-opacity duration-500", !active && "opacity-60")}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
