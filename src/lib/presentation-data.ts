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
    "Intelligent objects and their facets are already created upstream. The CRO Orchestrator leverages them while it ingests signals, ranks work, composes projects and tasks, and hands off to the execution stack.",
  partnerNote:
    "Concrete examples use Supra Distribution as a design partner—rep command center patterns (GTA territory, accounts, calendars, agents) without changing the underlying orchestration model.",
  badge: "Continuous orchestration",
} as const;

/** Shared context demo block (Supra-flavored, still generic pattern). */
export const sharedContextDemo =
  "Supra · Ontario & GTA — DLX/HUF pre-book windows, Switch buyer follow-up before May allocation, Kevin team pipeline rhythm. Agents see the same story: no duplicate outreach to Sanction / Blue Tile / Switch on overlapping threads.";

export const orchestrationFlowIntro =
  "Supra-informed walkthrough: rep calendars and standing meetings help the orchestrator decide where work is deadline-bound vs rhythm-bound—the timeline below advances one highlighted step about every five seconds.";

/** How the CRO Orchestrator is equipped: skill + dedicated workspace/project MCP (design intent for the deck). */
export const orchestratorSkillAndMcp =
  "The CRO Orchestrator runs with its own Markdown skill and a dedicated MCP server for project-based work: create and update workspaces and projects, assign agents to tasks, list agents in the fleet, and expose the other workspace operations the loop needs—so orchestration stays governed instead of handing every specialist a wide-open toolbelt.";

export const frameworkFooterIntro =
  "Supra’s rep command center pairs insights, projects, and actions with agent loops. The orchestrator’s skill plus its workspace MCP is how that work is applied day to day; the four designs below still define agent loops, the broader MCP catalog, per-agent skills, and the workspace data model.";

export const intelligentObjectFacets = [
  {
    id: "directives",
    title: "Directives",
    description:
      "Intent and constraints the orchestrator applies when scoring and routing work (e.g. Supra rep vs manager responsibilities).",
  },
  {
    id: "projected-roi",
    title: "Projected ROI",
    description: "Expected outcomes the orchestrator weighs against capacity, risk, and timing.",
  },
  {
    id: "additional-data",
    title: "Additional Relevant Data",
    description:
      "CRM, finance, ops, and territory context the orchestrator consults—account lists, brand mix, competitor notes (Supra-style field signals).",
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
      "Surface patterns across the freshest artifacts—Supra-shaped examples include pre-book risk, brand YoY softness, and “likely one-time” in-stock spikes vs sustained reorder signals.",
  },
  {
    id: "profiles-calendars",
    order: 2,
    title: "Quinn profiles & calendars",
    summary:
      "Supra example: a one-off account visit (e.g. CJ Skateboard Park site visit Apr 29) reads as deadline-bound prep—tasks get explicit due dates. A recurring internal cadence (e.g. Kevin team weekly pipeline review) reads as a rhythm anchor—agent loops own standing prep instead of duplicating one-time tickets every week.",
  },
  {
    id: "agent-fleet",
    order: 3,
    title: "Customer agent fleet",
    summary:
      "Match work to the right specialist—Supra-style fleet spans account intelligence, brand & product health, pre-book/pipeline tracking, anomaly surfacing, and territory/competition scans.",
  },
  {
    id: "rank-viability",
    order: 4,
    title: "Rank viability (0–100)",
    summary:
      "Score completion confidence using calendars (deadline density), agent coverage, and insight urgency—e.g. allocation windows vs standing internal reviews.",
  },
  {
    id: "create-projects",
    order: 5,
    title: "Create projects per user",
    summary:
      "Materialize workspaces the field already recognizes—pre-book conversion, Q2 territory plan, competitor footprint—with clear owners (rep, manager, shared ops).",
  },
  {
    id: "create-tasks",
    order: 6,
    title: "Create tasks",
    summary:
      "Break plans into units with owners and cadence—e.g. one-time “confirm Sanction Apr reorder before Apr 28 window” vs recurring “pre-read for Kevin team pipeline review each Thursday.”",
  },
  {
    id: "assign-work",
    order: 7,
    title: "Assign agent vs human, one-time vs loop",
    summary:
      "Calendar semantics carry through: fixed buyer meetings and allocation deadlines → human or agent one-time tasks with hard due dates; repeating standups and monthly 1:1s → daily/weekly loops that regenerate briefs without reopening the same project every cycle.",
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
      "Accept or reject the plan with a required reason. Each decision becomes a preference bullet merged into your CRO Orchestrator system prompt the next time new projects are created—so the loop gets smarter per user over time.",
  },
];

export const executePanel = {
  flowTitle: "Execute when satisfied",
  flowDescription:
    "Explicit approval ships work into the execution framework below—or reject with context. A reason is always required so we can append a preference bullet to your orchestrator prompt and improve the next project draft for you.",
  reasonLabelAccept: "Approval reason",
  reasonLabelReject: "Rejection reason",
  reasonHelp:
    "We log this as a bullet in your per-user orchestrator preferences and regenerate the system prompt when new projects are created.",
  reasonPlaceholderAccept:
    "What you are endorsing and why (e.g. calendar coverage, risk tradeoffs, readiness to ship)…",
  reasonPlaceholderReject:
    "What must change before you would ship (e.g. deadlines, overlap with other agents, missing data)…",
  minReasonChars: 10,
  acceptButton: "Accept project",
  rejectButton: "Reject project",
  submitAccept: "Submit approval",
  submitReject: "Submit rejection",
  cancel: "Cancel",
  validationError: "Enter at least 10 characters so the preference is actionable.",
  successAccept: "Approval logged — orchestrator prompt will include this bullet on the next project run.",
  successReject: "Rejection logged — orchestrator prompt will include this bullet on the next project run.",
  preferenceCardTitle: "Orchestrator prompt — your preference bullets",
  preferenceCardIntro:
    "Mock preview of per-user bullets merged into the CRO Orchestrator system prompt when drafting new projects (wire to your profile / prompt store).",
  seedPreferenceBullets: [
    "Prefer weekly prep loops for standing internal reviews; one-time tasks only for fixed buyer visits with hard dates.",
  ] as const,
} as const;

export const signalPanel = {
  recentObjects: {
    title: "Recent intelligent objects",
    items: [
      "Switch Skate — pre-book vs last year (allocation risk)",
      "HUF YoY decline — shelf & competitor follow-up",
      "March in-stock spike — one-time surge vs sustained reorder",
      "Spring pre-book conversion tracker (DLX / HUF / Hockey)",
      "Q2 territory growth plan — GTA & Southern Ontario",
    ],
  },
  profiles: {
    title: "Quinn users & calendars",
    hint:
      "Supra field pattern: fixed account or site-visit blocks → one-time tasks with hard due dates; recurring manager standups → agent loops for prep so the same briefing is not re-filed every week.",
    items: [
      "Justin Czank — rep calendar (account visits, drive days)",
      "Kevin Team — weekly pipeline review (recurring anchor)",
      "Sanction Skate — Q2 planning Apr 25 (fixed prep window)",
      "CJ Skateboard Park — site visit Apr 29 (one-time prep chain)",
    ],
  },
  fleet: {
    title: "Agent fleet snapshot",
    items: [
      "Account intelligence — account health & reactivation signals",
      "Brand & product — DLX/HUF/Hockey mix and sell-through",
      "Pre-book & pipeline — conversion, pending confirmations",
      "Anomaly detection — spikes, gaps, and “likely one-time” flags",
    ],
  },
} as const;

export const viabilityRows = [
  {
    label: "Switch pre-book recovery",
    score: 92,
    note: "Clear buyer + deadline story; calendar shows runway before May allocation",
  },
  {
    label: "HUF shelf / share recovery",
    score: 76,
    note: "Depends on visit cadence and photo audit tasks landing before summer drop",
  },
  {
    label: "Birling post-zero-order follow-up",
    score: 41,
    note: "Human assist to validate pattern vs seasonal before automating outreach",
  },
] as const;

export const assignmentLegend = [
  { label: "Agent", token: "agent" as const },
  { label: "Human assist", token: "human" as const },
  { label: "One-time", token: "once" as const },
  { label: "Daily loop", token: "daily" as const },
  { label: "Weekly loop", token: "weekly" as const },
] as const;

export const projectPlanPreview = {
  users: ["Justin Czank (Ontario rep)", "Kevin McCoubrey (manager)", "RevOps / finance (shared)"],
  projects: [
    {
      title: "Spring pre-book — GTA priority accounts",
      context:
        "Supra workspace: Switch FA summer line + competitor pitch timing. Everyone reads the same context—who owns buyer comms, which agents already drafted outreach, and which deadlines are hard vs rolling.",
      tasks: [
        { title: "Weekly loop: pipeline review brief for Kevin team (Thu)", tags: ["agent", "weekly"] as const },
        { title: "One-time: Switch buyer call + pre-book commit before May 2", tags: ["human", "once"] as const },
        { title: "Daily loop: conversion tracker refresh (12/18 confirmed)", tags: ["agent", "daily"] as const },
      ],
    },
    {
      title: "HUF recovery — shelf & placement",
      context:
        "Tied to calendar-driven shop visits (So Hip, Blue Tile, Boardany One). Shared context blocks duplicate HUF audits the same week.",
      tasks: [
        { title: "One-time: photo audit at 5 doors before May 9", tags: ["agent", "once"] as const },
        { title: "Human: summer lookbook walkthrough where velocity highest", tags: ["human", "once"] as const },
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

/** How long each orchestration step stays highlighted before advancing (full loop = steps × this). */
export const orchestrationStepHighlightMs = 5_000;

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
