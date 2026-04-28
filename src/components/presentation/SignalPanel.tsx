import { CalendarDays, Orbit, Radar } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSignalHighlight, signalPanel, type OrchestrationPhaseId } from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

type SignalPanelProps = {
  phase: OrchestrationPhaseId;
};

const sections = [
  {
    key: "recent" as const,
    title: signalPanel.recentObjects.title,
    items: signalPanel.recentObjects.items,
    icon: Radar,
  },
  {
    key: "profiles" as const,
    title: signalPanel.profiles.title,
    items: signalPanel.profiles.items,
    icon: CalendarDays,
    hint: signalPanel.profiles.hint,
  },
  {
    key: "fleet" as const,
    title: signalPanel.fleet.title,
    items: signalPanel.fleet.items,
    icon: Orbit,
  },
] as const;

export function SignalPanel({ phase }: SignalPanelProps) {
  const highlight = getSignalHighlight(phase);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Live signals
          </p>
          <h3 className="font-heading text-base font-semibold tracking-tight">What the CRO Orchestrator reads</h3>
        </div>
      </div>
      <div className="grid gap-3">
        {sections.map((section) => {
          const active = highlight === section.key;
          const Icon = section.icon;
          return (
            <Card
              key={section.key}
              size="sm"
              className={cn(
                "border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-500",
                active &&
                  "ring-1 ring-sidebar-primary/50 shadow-[0_18px_60px_-28px_color-mix(in_oklab,var(--color-sidebar-primary)_30%,transparent)]"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-lg ring-1 ring-foreground/10",
                      active ? "bg-sidebar-primary/15 text-sidebar-primary" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <CardTitle className="text-sm">{section.title}</CardTitle>
                    {"hint" in section ? (
                      <CardDescription className="mt-0.5 text-[0.65rem] leading-relaxed text-muted-foreground/95">
                        {section.hint}
                      </CardDescription>
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-[132px] pr-3">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex items-start gap-2 rounded-md border border-transparent px-2 py-1.5",
                          active && "border-border/60 bg-muted/40 text-foreground"
                        )}
                      >
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-sidebar-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
