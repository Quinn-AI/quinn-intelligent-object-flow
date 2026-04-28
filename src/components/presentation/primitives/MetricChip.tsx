import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MetricChipProps = {
  children: ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
};

export function MetricChip({ children, variant = "secondary", className }: MetricChipProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "rounded-md px-2 py-0.5 text-[0.7rem] font-medium tracking-wide uppercase",
        className
      )}
    >
      {children}
    </Badge>
  );
}
