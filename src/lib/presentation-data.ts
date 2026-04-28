export type OrchestrationPhaseId =
  | "recent-objects"
  | "profiles-calendars"
  | "agent-fleet"
  | "rank-viability"
  | "create-projects"
  | "create-tasks"
  | "assign-work"
  | "shared-context"
  | "execute";

export const hero = {
  title: "Intelligent Object → Orchestrated Execution",
  subtitle:
    "How the CRO Agent ingests signals, ranks work, composes projects and tasks, and hands off to the execution stack.",
  badge: "Continuous orchestration",
} as const;

export const intelligentObjectFacets = [
  {
    id: "directives",
    title: "Directives",
    description: "Strategic intent, constraints, and success criteria the org has stated.",
  },
  {
    id: "projected-roi",
    title: "Projected ROI",
    description: "Expected lift, margin, or efficiency modeled from current and prior signals.",
  },
  {
    id: "additional-data",
    title: "Additional Relevant Data",
    description: "CRM, finance, ops, and third-party context that sharpens prioritization.",
  },
] as const;

export const orchestrationSteps: {
  id: OrchestrationPhaseId;
  order: number;
  title: string;
  summary: string;
}[] = [
  {
    id: "recent-objects",
    order: 1,
    title: "Analyze 5 recent intelligent objects",
    summary:
      "Surface patterns, blockers, and duplication across the freshest work artifacts.",
  },
  {
    id: "profiles-calendars",
    order: 2,
    title: "Quinn profiles & calendars",
    summary:
      "Executives and operators on Quinn—personal and team calendars inform capacity and timing.",
  },
  {
    id: "agent-fleet",
    order: 3,
    title: "Customer agent fleet",
    summary:
      "Read each agent’s description and capabilities to match work to the right specialist.",
  },
  {
    id: "rank-viability",
    order: 4,
    title: "Rank viability (0–100)",
    summary:
      "Score each intelligent object for likelihood of completion given capacity and dependencies.",
  },
  {
    id: "create-projects",
    order: 5,
    title: "Create projects per user",
    summary:
      "Materialize scoped projects in the right workspaces with clear problem statements.",
  },
  {
    id: "create-tasks",
    order: 6,
    title: "Create tasks",
    summary:
      "Break plans into actionable units with owners, cadence, and human/agent expectations.",
  },
  {
    id: "assign-work",
    order: 7,
    title: "Assign agent vs human, one-time vs loop",
    summary:
      "Route to autonomous agents where safe; flag human assist; schedule daily/weekly loops when needed.",
  },
  {
    id: "shared-context",
    order: 8,
    title: "Shared business context",
    summary:
      "One project context box—editable—so every agent sees the same north star and peer work, avoiding overlap.",
  },
  {
    id: "execute",
    order: 9,
    title: "Execute when satisfied",
    summary:
      "Explicit approval: ship the plan into the execution framework below.",
  },
];

export const signalPanel = {
  recentObjects: {
    title: "Recent intelligent objects",
    items: [
      "Q2 margin recovery brief",
      "Retail anomaly watchlist",
      "Exec pipeline hygiene",
      "Partner co-sell motions",
      "Inventory risk signals",
    ],
  },
  profiles: {
    title: "Quinn users & calendars",
    items: [
      "CRO + RevOps leadership",
      "Regional GMs on shared standups",
      "Finance close blackout windows",
      "Customer success QBR cadence",
    ],
  },
  fleet: {
    title: "Agent fleet snapshot",
    items: [
      "Briefing agent — narrative synthesis",
      "Anomaly agent — threshold surfacing",
      "SQL analyst — governed queries",
      "Custom margin deep-dive — org skill",
    ],
  },
} as const;

export const viabilityRows = [
  { label: "Margin recovery brief", score: 92, note: "Strong data + owner capacity" },
  { label: "Retail anomaly watchlist", score: 76, note: "Depends on connector freshness" },
  { label: "Partner co-sell motions", score: 41, note: "Human assist required for approvals" },
] as const;

export const assignmentLegend = [
  { label: "Agent", token: "agent" as const },
  { label: "Human assist", token: "human" as const },
  { label: "One-time", token: "once" as const },
  { label: "Daily loop", token: "daily" as const },
  { label: "Weekly loop", token: "weekly" as const },
] as const;

export const projectPlanPreview = {
  users: ["Avery (CRO)", "Jordan (RevOps)", "Riley (CS)"],
  projects: [
    {
      title: "Margin recovery — North America",
      context:
        "North star: restore category margin without sacrificing NPS. All agents read this block; task edits stay visible to the fleet.",
      tasks: [
        { title: "Validate anomaly drivers vs last close", tags: ["agent", "daily"] as const },
        { title: "Align pricing actions with finance", tags: ["human", "once"] as const },
        { title: "Ship weekly exec digest", tags: ["agent", "weekly"] as const },
      ],
    },
    {
      title: "Pipeline hygiene sprint",
      context:
        "Shared context lists owners, definitions of clean stages, and what other agents already touched this week.",
      tasks: [
        { title: "Score stalled deals with Quinn signals", tags: ["agent", "once"] as const },
        { title: "Rep outreach where confidence < threshold", tags: ["human", "daily"] as const },
      ],
    },
  ],
} as const;

export const frameworkDocs = [
  {
    file: "AGENT_LOOPS_DESIGN.md",
    title: "Agent loops",
    description:
      "Recurring invocations with schedules, prompt templates, output shapes, and delivery endpoints.",
  },
  {
    file: "docs/MCP_CATALOG_DESIGN.md",
    title: "MCP catalog",
    description:
      "Registry-backed tool surfaces with env-resolved secrets and per-agent allow lists.",
  },
  {
    file: "docs/SKILLS_DESIGN.md",
    title: "Skills",
    description:
      "Markdown skills per agent identity, versioned revisions, and governed behavior in runtime.",
  },
  {
    file: "docs/WORKSPACES_DESIGN.md",
    title: "Workspaces",
    description:
      "Workspaces, projects, sections, and tasks—the durable home for plans and inbox work.",
  },
] as const;

export const orchestrationPhases: OrchestrationPhaseId[] = orchestrationSteps.map(
  (s) => s.id
);

export function getSignalHighlight(
  phase: OrchestrationPhaseId
): "recent" | "profiles" | "fleet" | null {
  if (phase === "recent-objects") return "recent";
  if (phase === "profiles-calendars") return "profiles";
  if (phase === "agent-fleet") return "fleet";
  return null;
}

export function isViabilityPhase(phase: OrchestrationPhaseId) {
  return phase === "rank-viability";
}

export function isPlanPhase(phase: OrchestrationPhaseId) {
  return (
    phase === "create-projects" ||
    phase === "create-tasks" ||
    phase === "assign-work"
  );
}

export function isContextPhase(phase: OrchestrationPhaseId) {
  return phase === "shared-context";
}

export function isExecutePhase(phase: OrchestrationPhaseId) {
  return phase === "execute";
}
