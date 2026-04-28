import { Brain, LineChart, ListChecks, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { intelligentObjectFacets } from "@/lib/presentation-data";

import { AnimatedReveal } from "./primitives/AnimatedReveal";

const facetIcons = {
  directives: ListChecks,
  "projected-roi": LineChart,
  "additional-data": Sparkles,
} as const;

export function IntelligentObjectDiagram() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Anatomy
          </p>
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            What feeds an intelligent object
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Three inputs converge into a single orchestration artifact the CRO Agent can reason over.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,280px)_1fr] lg:items-stretch">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
          {intelligentObjectFacets.slice(0, 2).map((facet, index) => {
            const Icon = facetIcons[facet.id as keyof typeof facetIcons];
            return (
              <AnimatedReveal key={facet.id} delay={index * 0.08}>
                <Card className="h-full border-border/80 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted ring-1 ring-foreground/10">
                        <Icon className="size-4 text-muted-foreground" />
                      </span>
                      <CardTitle className="text-base">{facet.title}</CardTitle>
                    </div>
                    <CardDescription>{facet.description}</CardDescription>
                  </CardHeader>
                </Card>
              </AnimatedReveal>
            );
          })}
        </div>

        <AnimatedReveal delay={0.12} className="order-first lg:order-none">
          <Card className="relative flex h-full flex-col justify-between overflow-hidden border-border/80 bg-gradient-to-b from-card via-card to-muted/40">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-sidebar-primary) 22%, transparent), transparent 45%), radial-gradient(circle at 80% 0%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent 40%)",
              }}
            />
            <CardHeader className="relative z-10 space-y-3 pb-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Brain className="size-4" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase">
                  Intelligent object
                </span>
              </div>
              <CardTitle className="text-lg sm:text-xl">Unified decision payload</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Directives, ROI, and live context compress into one object the orchestrator treats as
                authoritative for prioritization.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <Separator className="mb-4 bg-border/70" />
              <div className="flex flex-wrap gap-2">
                {intelligentObjectFacets.map((f) => (
                  <span
                    key={f.id}
                    className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {f.title}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedReveal>

        <AnimatedReveal delay={0.16}>
          <Card className="h-full border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted ring-1 ring-foreground/10">
                  {(() => {
                    const Icon = facetIcons["additional-data"];
                    return <Icon className="size-4 text-muted-foreground" />;
                  })()}
                </span>
                <CardTitle className="text-base">
                  {intelligentObjectFacets[2]?.title ?? "Additional data"}
                </CardTitle>
              </div>
              <CardDescription>{intelligentObjectFacets[2]?.description}</CardDescription>
            </CardHeader>
          </Card>
        </AnimatedReveal>
      </div>
    </section>
  );
}
