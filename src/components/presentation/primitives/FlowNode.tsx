import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FlowNodeProps = {
  title: string;
  description?: string;
  active?: boolean;
  subdued?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  className?: string;
  children?: ReactNode;
  size?: "default" | "sm";
};

export function FlowNode({
  title,
  description,
  active,
  subdued,
  icon,
  badge,
  className,
  children,
  size = "default",
}: FlowNodeProps) {
  return (
    <Card
      size={size}
      className={cn(
        "relative transition-[box-shadow,transform,opacity] duration-500 ease-out",
        active &&
          "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-sidebar-primary)_55%,transparent),0_24px_80px_-32px_color-mix(in_oklab,var(--color-sidebar-primary)_35%,transparent)]",
        subdued && !active && "opacity-55",
        className
      )}
    >
      {active ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-sidebar-primary/12 via-transparent to-transparent"
        />
      ) : null}
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            {icon ? (
              <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-foreground/10">
                {icon}
              </span>
            ) : null}
            <div className="space-y-1">
              <CardTitle className="text-[0.95rem] leading-snug">{title}</CardTitle>
              {description ? <CardDescription>{description}</CardDescription> : null}
            </div>
          </div>
          {badge}
        </div>
      </CardHeader>
      {children ? <CardContent className="relative z-10">{children}</CardContent> : null}
    </Card>
  );
}
