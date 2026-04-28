"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PlayCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  assignmentLegend,
  hero,
  isContextPhase,
  isExecutePhase,
  orchestrationPhases,
  type OrchestrationPhaseId,
} from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

import { FrameworkFooter } from "./FrameworkFooter";
import { IntelligentObjectDiagram } from "./IntelligentObjectDiagram";
import { OrchestrationFlow } from "./OrchestrationFlow";
import { ProjectPlanPreview } from "./ProjectPlanPreview";
import { SignalPanel } from "./SignalPanel";
import { ViabilityRanker } from "./ViabilityRanker";
import { AnimatedReveal } from "./primitives/AnimatedReveal";
import { FlowNode } from "./primitives/FlowNode";
import { MetricChip } from "./primitives/MetricChip";

const phaseDurationMs = 2800;

export function IntelligentObjectPresentation() {
  const reduce = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phase: OrchestrationPhaseId =
    orchestrationPhases[phaseIndex] ?? orchestrationPhases[0]!;

  useEffect(() => {
    if (reduce) {
      return;
    }
    const id = window.setInterval(() => {
      setPhaseIndex((current) => (current + 1) % orchestrationPhases.length);
    }, phaseDurationMs);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: reduce ? undefined : "grid-drift 38s linear infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklab,var(--color-sidebar-primary)_18%,transparent),transparent_45%),radial-gradient(circle_at_80%_10%,color-mix(in_oklab,var(--color-primary)_12%,transparent),transparent_40%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <AnimatedReveal>
          <header className="flex flex-col gap-6 border-b border-border/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5 text-sidebar-primary" />
                {hero.badge}
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  {hero.title}
                </h1>
                <p className="max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
                  {hero.subtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 font-mono text-[0.7rem] text-foreground/80">
                Phase · {phase.replaceAll("-", " ")}
              </span>
              <p className="max-w-xs text-[0.8rem] leading-relaxed">
                {reduce
                  ? "Reduced motion: phases stay static for clarity."
                  : "The deck loops continuously—each beat spotlights a different orchestration surface."}
              </p>
            </div>
          </header>
        </AnimatedReveal>

        <IntelligentObjectDiagram />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <OrchestrationFlow phase={phase} />
          <div className="space-y-6">
            <SignalPanel phase={phase} />
            <ViabilityRanker phase={phase} />
            <ProjectPlanPreview phase={phase} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch">
          <FlowNode
            title="Shared project business context"
            description="One editable context box per project. Every agent reads the same narrative, milestones, and guardrails—and sees what peers already picked up so work does not collide."
            active={isContextPhase(phase)}
            icon={<Sparkles className="size-4" />}
            className="h-full border-border/70 bg-card/80 backdrop-blur-md"
          >
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-3 font-mono text-xs leading-relaxed text-foreground/90">
                Q3 margin recovery · exec readout on Thursdays · pricing experiments owned by finance · no
                duplicate outreach to the same partner accounts.
              </div>
              <div className="flex flex-wrap gap-2">
                {assignmentLegend.map((item) => (
                  <MetricChip
                    key={item.token}
                    variant="outline"
                    className="border-border/70 bg-background/60 text-[0.65rem] font-medium normal-case tracking-normal text-muted-foreground"
                  >
                    {item.label}
                  </MetricChip>
                ))}
              </div>
            </div>
          </FlowNode>

          <FlowNode
            title="Execute when satisfied"
            description="Approving freezes the plan and hands execution to the stack below—loops, MCP-governed tools, skills, and workspace-native tasks."
            active={isExecutePhase(phase)}
            icon={<PlayCircle className="size-4" />}
            className="h-full justify-between border-border/70 bg-gradient-to-b from-card via-card to-muted/30"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    className={cn(
                      "relative overflow-hidden px-6 text-base shadow-lg shadow-sidebar-primary/15 transition-all",
                      isExecutePhase(phase) &&
                        "ring-2 ring-sidebar-primary/60 shadow-[0_20px_80px_-24px_color-mix(in_oklab,var(--color-sidebar-primary)_40%,transparent)]"
                    )}
                    style={
                      isExecutePhase(phase)
                        ? {
                            backgroundImage:
                              "linear-gradient(110deg, color-mix(in oklab, var(--color-sidebar-primary) 35%, transparent), transparent 40%, color-mix(in oklab, var(--color-sidebar-primary) 25%, transparent))",
                            backgroundSize: "220% 100%",
                            animation: "flow-shimmer 2.4s linear infinite",
                          }
                        : undefined
                    }
                  >
                    Execute plan
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
                  Static presentation control—wire this to your orchestration API when you are ready.
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-muted-foreground">
                Tasks remain editable until execute; assignments can move between agent, human assist, and
                scheduled loops.
              </p>
            </div>
          </FlowNode>
        </div>

        <FrameworkFooter />
      </div>
    </div>
  );
}
