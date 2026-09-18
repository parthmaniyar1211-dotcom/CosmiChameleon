export interface TechNodeItem {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  coordinates: [number, number, number];
}

export const techEcosystem = {
  centralCore: {
    name: "CosmiChameleon Core",
    tagline: "Adaptive Engineering & Systems Intelligence",
    description: "The central nexus synthesizing software development, design ergonomics, and automated intelligence."
  },
  nodes: [
    {
      id: "web",
      name: "WEB",
      role: "Digital Touchpoints & Storefronts",
      description: "Fast, resilient, high-conversion interfaces that adapt seamlessly to any device screen.",
      capabilities: ["Reactive Client Engines", "Edge Rendering & CDNs", "3D Interactive WebGL", "Headless Commerce Architecture"],
      coordinates: [-2.2, 1.2, 0.4] as [number, number, number]
    },
    {
      id: "software",
      name: "SOFTWARE",
      role: "Custom Operational Systems",
      description: "Engineered backends, secure client portals, and bespoke applications running core business operations.",
      capabilities: ["High-Throughput Microservices", "Relational & Vector Stores", "Enterprise Role Auth", "Robust REST & GraphQL APIs"],
      coordinates: [2.2, 1.2, -0.4] as [number, number, number]
    },
    {
      id: "ai",
      name: "AI",
      role: "Intelligent Augmentation",
      description: "Multimodal models, semantic retrieval, and agentic workflows embedded directly into products.",
      capabilities: ["Contextual RAG Pipelines", "Autonomous Agent Loops", "Document & OCR Extraction", "Custom LLM Orchestration"],
      coordinates: [-1.8, -1.4, 0.8] as [number, number, number]
    },
    {
      id: "automation",
      name: "AUTOMATION",
      role: "Frictionless Workflow Fabric",
      description: "Event-driven bridges and background workers syncing data across disparate commercial tools.",
      capabilities: ["Cross-Tool Webhook Meshes", "Event-Driven Asynchronous Buses", "Resilient State Sync Loops", "Automated Billing & Reporting"],
      coordinates: [1.8, -1.4, -0.6] as [number, number, number]
    },
    {
      id: "cloud",
      name: "CLOUD",
      role: "Resilient Global Infrastructure",
      description: "Scalable serverless environments, continuous automated deployments, and continuous monitoring.",
      capabilities: ["Automated CI/CD Pipelines", "Containerized Clusters", "Encrypted Secrets & VPCs", "Real-Time Telemetry & Logs"],
      coordinates: [0, 2.3, 0] as [number, number, number]
    }
  ]
};
