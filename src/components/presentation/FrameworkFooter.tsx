import { BookMarked, Boxes, Cable, Workflow } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { frameworkDocs, frameworkFooterIntro } from "@/lib/presentation-data";

const icons = [Workflow, Cable, BookMarked, Boxes] as const;

export function FrameworkFooter() {
  return (
    <section className="space-y-6 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Execution stack
          </p>
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            What actually runs the plan
          </h2>
        </div>
        <p className="max-w-lg text-sm text-muted-foreground">{frameworkFooterIntro}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {frameworkDocs.map((doc, index) => {
          const Icon = icons[index] ?? Boxes;
          return (
            <Card
              key={doc.file}
              className="h-full border-border/70 bg-card/70 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-0.5"
            >
              <CardHeader className="space-y-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted ring-1 ring-foreground/10">
                  <Icon className="size-4 text-muted-foreground" />
                </span>
                <div className="space-y-1">
                  <CardTitle className="text-base">{doc.title}</CardTitle>
                  <code className="block rounded-md bg-muted/60 px-2 py-1 text-[0.7rem] text-muted-foreground">
                    {doc.file}
                  </code>
                </div>
                <CardDescription className="text-xs leading-relaxed sm:text-sm">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                Reference doc in the Command Center repository.
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
