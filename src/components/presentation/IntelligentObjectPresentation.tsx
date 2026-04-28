"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PlayCircle, Sparkles } from "lucide-react";

import {
  assignmentLegend,
  executePanel,
  hero,
  isContextPhase,
  isExecutePhase,
  orchestrationPhases,
  orchestrationStepHighlightMs,
  sharedContextDemo,
  type OrchestrationPhaseId,
} from "@/lib/presentation-data";
import { ExecuteDecisionPanel } from "./ExecuteDecisionPanel";
import { FrameworkFooter } from "./FrameworkFooter";
import { IntelligentObjectDiagram } from "./IntelligentObjectDiagram";
import { OrchestrationFlow } from "./OrchestrationFlow";
import { ProjectPlanPreview } from "./ProjectPlanPreview";
import { SignalPanel } from "./SignalPanel";
import { ViabilityRanker } from "./ViabilityRanker";
import { AnimatedReveal } from "./primitives/AnimatedReveal";
import { FlowNode } from "./primitives/FlowNode";
import { MetricChip } from "./primitives/MetricChip";

export function IntelligentObjectPresentation() {
  const reduce = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phase: OrchestrationPhaseId =
    orchestrationPhases[phaseIndex] ?? orchestrationPhases[0]!;

  useEffect(() => {
    const ms = reduce ? Math.max(orchestrationStepHighlightMs * 2, 2_000) : orchestrationStepHighlightMs;
    const id = window.setInterval(() => {
      setPhaseIndex((current) => (current + 1) % orchestrationPhases.length);
    }, ms);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- orchestrationStepHighlightMs is immutable; keep in deps so array arity stays stable (React dev / HMR).
  }, [reduce, orchestrationStepHighlightMs]);

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
                <p className="max-w-2xl text-pretty text-xs text-muted-foreground/90 sm:text-sm">
                  {hero.partnerNote}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 font-mono text-[0.7rem] text-foreground/80">
                Phase · {phase.replaceAll("-", " ")}
              </span>
              <p className="max-w-xs text-[0.8rem] leading-relaxed">
                {reduce
                  ? "Reduced motion: calmer transitions; the same orchestration phase still drives signals, ranking, planning, and execution."
                  : "Signals, viability ranking, project plan, and execution stay aligned with the active orchestration phase."}
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
                {sharedContextDemo}
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
            title={executePanel.flowTitle}
            description={executePanel.flowDescription}
            active={isExecutePhase(phase)}
            icon={<PlayCircle className="size-4" />}
            className="h-full justify-between border-border/70 bg-gradient-to-b from-card via-card to-muted/30"
          >
            <ExecuteDecisionPanel phaseActive={isExecutePhase(phase)} />
          </FlowNode>
        </div>

        <FrameworkFooter />
      </div>
    </div>
  );
}
