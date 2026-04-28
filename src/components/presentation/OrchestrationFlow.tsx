"use client";

import { motion, useReducedMotion } from "motion/react";
import { Bot, CheckCircle2, Circle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  orchestrationFlowIntro,
  orchestratorSkillAndMcp,
  orchestrationSteps,
  type OrchestrationPhaseId,
} from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

type OrchestrationFlowProps = {
  phase: OrchestrationPhaseId;
};

export function OrchestrationFlow({ phase }: OrchestrationFlowProps) {
  const reduce = useReducedMotion();

  return (
    <Card className="relative overflow-hidden border-border/70 bg-card/70 backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sidebar-primary/10 to-transparent"
      />
      <CardHeader className="relative z-10 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Orchestrator
            </p>
            <CardTitle className="text-lg sm:text-xl">CRO Orchestrator control plane</CardTitle>
            <div className="space-y-2">
              <CardDescription className="text-xs sm:text-sm">{orchestrationFlowIntro}</CardDescription>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {orchestratorSkillAndMcp}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 text-[0.7rem]">
            <Bot className="size-3.5" />
            Managed session
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-0 px-2 pb-4 sm:px-4">
        <div className="relative py-1">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-border via-sidebar-primary/40 to-border sm:left-[17px]"
          />
          <ol className="relative space-y-3">
            {orchestrationSteps.map((step) => {
              const active = step.id === phase;
              return (
                <motion.li
                  key={step.id}
                  layout={!reduce}
                  className="relative pl-10 sm:pl-11"
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0.48,
                    scale: active && !reduce ? 1.01 : 1,
                    y: active && !reduce ? -1 : 0,
                  }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="absolute left-[10px] top-3 flex size-4 items-center justify-center sm:left-[12px]">
                    {active ? (
                      <motion.span
                        layoutId="active-orchestration-dot"
                        className="relative flex size-3.5 items-center justify-center"
                      >
                        <span className="absolute inset-0 rounded-full bg-sidebar-primary/25 blur-[6px]" />
                        <CheckCircle2 className="relative size-4 text-sidebar-primary" />
                      </motion.span>
                    ) : (
                      <Circle className="size-3.5 text-muted-foreground/70" />
                    )}
                  </span>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-xl border border-border/70 bg-background/50 p-3 ring-1 ring-transparent transition-[box-shadow,transform,border-color,background-color] duration-300 ease-out",
                      active &&
                        "border-sidebar-primary/40 bg-gradient-to-r from-sidebar-primary/10 via-card/70 to-card/80 ring-sidebar-primary/30 shadow-[0_16px_60px_-32px_color-mix(in_oklab,var(--color-sidebar-primary)_35%,transparent)]"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
                        <span className="font-mono text-[0.65rem] text-foreground/80">0{step.order}</span>
                        <span>Step</span>
                      </div>
                      {active ? (
                        <Badge className="rounded-full bg-sidebar-primary/15 text-[0.65rem] text-sidebar-primary">
                          Live focus
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 font-medium leading-snug">{step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{step.summary}</p>
                    {active && step.id === "execute" ? (
                      <p className="mt-2 border-t border-border/60 pt-2 text-xs text-muted-foreground">
                        Use <span className="font-medium text-foreground">Accept project</span> or{" "}
                        <span className="font-medium text-foreground">Reject project</span> in the execution
                        panel—a required reason trains your orchestrator preferences for the next project draft.
                      </p>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
