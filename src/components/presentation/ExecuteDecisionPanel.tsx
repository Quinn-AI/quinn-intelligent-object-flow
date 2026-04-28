"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { executePanel } from "@/lib/presentation-data";
import { cn } from "@/lib/utils";

type DecisionMode = "idle" | "accept" | "reject";

type ExecuteDecisionPanelProps = {
  phaseActive: boolean;
};

export function ExecuteDecisionPanel({ phaseActive }: ExecuteDecisionPanelProps) {
  const [mode, setMode] = useState<DecisionMode>("idle");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [bullets, setBullets] = useState<string[]>(() => [...executePanel.seedPreferenceBullets]);

  const canSubmit = useMemo(
    () => reason.trim().length >= executePanel.minReasonChars,
    [reason]
  );

  function resetForm() {
    setMode("idle");
    setReason("");
    setError(null);
  }

  function submit(kind: "accept" | "reject") {
    const trimmed = reason.trim();
    if (trimmed.length < executePanel.minReasonChars) {
      setError(executePanel.validationError);
      return;
    }
    setError(null);
    const line =
      kind === "accept"
        ? `Approved plan: ${trimmed}`
        : `Rejected plan: ${trimmed}`;
    setBullets((prev) => [...prev, line]);
    setBanner(kind === "accept" ? executePanel.successAccept : executePanel.successReject);
    resetForm();
  }

  return (
    <div className={cn("flex flex-col gap-4", !phaseActive && "opacity-70")}>
      {banner ? (
        <p className="rounded-lg border border-sidebar-primary/30 bg-sidebar-primary/10 px-3 py-2 text-xs text-foreground">
          {banner}
        </p>
      ) : null}

      {mode === "idle" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            size="lg"
            className={cn(
              "gap-2 px-6 shadow-md transition-all",
              phaseActive && "ring-2 ring-sidebar-primary/40 shadow-sidebar-primary/10"
            )}
            onClick={() => {
              setBanner(null);
              setMode("accept");
            }}
          >
            <CheckCircle2 className="size-4" />
            {executePanel.acceptButton}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-destructive/40 px-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              setBanner(null);
              setMode("reject");
            }}
          >
            <XCircle className="size-4" />
            {executePanel.rejectButton}
          </Button>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
          <Label htmlFor="execute-reason" className="text-foreground">
            {mode === "accept" ? executePanel.reasonLabelAccept : executePanel.reasonLabelReject}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="execute-reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError(null);
            }}
            placeholder={
              mode === "accept"
                ? executePanel.reasonPlaceholderAccept
                : executePanel.reasonPlaceholderReject
            }
            rows={4}
            aria-invalid={Boolean(error)}
            className="min-h-28 resize-y text-sm"
          />
          <p className="text-xs text-muted-foreground">{executePanel.reasonHelp}</p>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="default"
              disabled={!canSubmit}
              onClick={() => submit(mode === "accept" ? "accept" : "reject")}
            >
              {mode === "accept" ? executePanel.submitAccept : executePanel.submitReject}
            </Button>
            <Button type="button" variant="ghost" size="default" onClick={resetForm}>
              {executePanel.cancel}
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Tasks remain editable until you accept; reject returns you to planning with captured context for the
        orchestrator.
      </p>

      <Card className="border-border/70 bg-card/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{executePanel.preferenceCardTitle}</CardTitle>
          <CardDescription className="text-xs leading-relaxed">
            {executePanel.preferenceCardIntro}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-xs leading-relaxed text-muted-foreground marker:text-sidebar-primary">
            {bullets.map((b, i) => (
              <li key={`${i}-${b.slice(0, 24)}`} className="pl-0.5 text-foreground/90">
                {b}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
