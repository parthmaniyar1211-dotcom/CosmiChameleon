export interface ProcessStage {
  step: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
}

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Discover",
    summary: "Understand the business, users, goals, and problem.",
    description:
      "We begin by immersing ourselves in your operational reality. We analyze customer journeys, audit existing technical bottlenecks, interview stakeholders, and clearly define what success looks like.",
    deliverables: ["Problem Statement & Objectives", "User Persona & Workflow Maps", "Technical Feasibility Audit"]
  },
  {
    step: "02",
    title: "Strategize",
    summary: "Define technology, architecture, features, and roadmap.",
    description:
      "We architect the optimal technology stack, data schemas, API specifications, and phased milestone roadmap to ensure rapid delivery without technical debt or scope creep.",
    deliverables: ["System Architecture Blueprint", "Component & Database Schemas", "Phased Delivery Milestone Plan"]
  },
  {
    step: "03",
    title: "Design",
    summary: "Create the experience and product structure.",
    description:
      "We design intuitive, high-contrast user interfaces and comprehensive design systems. Every interaction, form state, and visual micro-detail is prototyped and validated before code is written.",
    deliverables: ["Interactive High-Fidelity Prototypes", "Design System & Component Library", "Ergonomic Usability Specs"]
  },
  {
    step: "04",
    title: "Build",
    summary: "Develop, integrate, test, and optimize.",
    description:
      "Our engineers write clean, typed, modular code. We integrate APIs, wire up AI pipelines, automate test coverage, and benchmark speed and accessibility across devices.",
    deliverables: ["Type-Safe Scalable Codebase", "API & Database Integrations", "Automated QA & Security Testing"]
  },
  {
    step: "05",
    title: "Launch",
    summary: "Deploy, measure, improve, and scale.",
    description:
      "We execute seamless production deployment with zero downtime, configure real-time monitoring, train your internal team, and partner with you to continuously measure impact and iterate.",
    deliverables: ["Production Cloud Deployment", "Monitoring & Telemetry Setup", "Documentation & Team Enablement"]
  }
];
