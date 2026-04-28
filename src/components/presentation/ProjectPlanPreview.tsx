import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { isPlanPhase, projectPlanPreview, type OrchestrationPhaseId } from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  agent: "bg-secondary text-secondary-foreground",
  human: "border border-border bg-transparent text-foreground",
  once: "border border-dashed border-border text-muted-foreground",
  daily: "bg-primary/15 text-primary",
  weekly: "bg-sidebar-primary/15 text-sidebar-primary",
};

const tagLabels: Record<string, string> = {
  agent: "Agent",
  human: "Human assist",
  once: "One-time",
  daily: "Daily loop",
  weekly: "Weekly loop",
};

type ProjectPlanPreviewProps = {
  phase: OrchestrationPhaseId;
};

export function ProjectPlanPreview({ phase }: ProjectPlanPreviewProps) {
  const pulse = isPlanPhase(phase);

  return (
    <Card
      className={cn(
        "border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-500",
        pulse &&
          "ring-1 ring-sidebar-primary/45 shadow-[0_18px_60px_-28px_color-mix(in_oklab,var(--color-sidebar-primary)_28%,transparent)]"
      )}
    >
      <CardHeader className="pb-3">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Plan output
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Projects & tasks preview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Static mock of what the orchestrator materializes—editable tasks with explicit routing and
              cadence.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            <span>{projectPlanPreview.users.join(" · ")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectPlanPreview.projects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl border border-border/70 bg-background/40 p-4 ring-1 ring-foreground/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium leading-snug">{project.title}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{project.context}</p>
              </div>
              <Badge variant="outline" className="text-[0.65rem] uppercase tracking-wide">
                Shared context
              </Badge>
            </div>
            <Separator className="my-4 bg-border/60" />
            <ul className="space-y-3">
              {project.tasks.map((task) => (
                <li
                  key={task.title}
                  className="flex flex-col gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {task.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[0.7rem] font-medium normal-case tracking-normal",
                          tagStyles[tag] ?? "border-border text-muted-foreground"
                        )}
                      >
                        {tagLabels[tag] ?? tag}
                      </Badge>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
