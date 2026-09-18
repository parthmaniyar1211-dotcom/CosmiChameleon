export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  liveUrl: string;
  ctaText: string;
  technology: string[];
  capabilities: string[];
  year: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "shieldscope",
    title: "ShieldScope",
    category: "Security / SaaS / Web Platform",
    headline: "Website Security & Intelligence Platform",
    description:
      "A web security intelligence engine providing automated analysis across SSL/TLS certificates, open ports, security headers, vulnerability detection, and DNS configuration.",
    liveUrl: "https://shieldscope.netlify.app/",
    ctaText: "Open Product ↗",
    technology: [
      "Security Engine",
      "SSL/TLS Auditing",
      "Port Scanning",
      "DNS Analysis",
      "Vulnerability Reports"
    ],
    capabilities: [
      "SSL/TLS Certificate Analysis",
      "Security Header Verification",
      "Port & Service Enumeration",
      "DNS Information & Configuration",
      "Automated Security Reporting"
    ],
    year: "2025"
  },
  {
    id: "mailx",
    title: "MailX",
    category: "Automation / Software Platform",
    headline: "Email Automation Platform",
    description:
      "A high-throughput transactional and automated email delivery engine engineered for dynamic template compilation, deliverability protection, and event-driven communication flows.",
    liveUrl: "https://mailx-mu.vercel.app/",
    ctaText: "Open Product ↗",
    technology: [
      "Email Infrastructure",
      "Dynamic Templating",
      "Event Pipelines",
      "Deliverability Protection",
      "Webhooks"
    ],
    capabilities: [
      "Dynamic HTML Template Compilation",
      "Deliverability & Reputation Guarding",
      "Event-Driven Email Dispatch",
      "Automated Communication Sequences",
      "Real-Time Delivery Webhooks"
    ],
    year: "2025"
  },
  {
    id: "voice-agent",
    title: "Voice Agent",
    category: "AI / Voice / Software",
    headline: "AI Voice Interaction Platform",
    description:
      "An ultra-low-latency bidirectional conversational voice platform capable of natural dialogue, streaming speech recognition, real-time tool calling, and telephone or browser audio bridging.",
    liveUrl: "https://voice-agent-lac-ten.vercel.app/login",
    ctaText: "Open Product ↗",
    technology: [
      "Conversational AI",
      "Streaming ASR",
      "Neural Speech",
      "WebRTC Audio",
      "Tool Execution"
    ],
    capabilities: [
      "Streaming Speech Recognition & Synthesis",
      "Natural Turn-Taking & Interruption Handling",
      "Autonomous Business Tool Calling",
      "SIP & WebRTC Audio Gateways",
      "Live Conversational State Management"
    ],
    year: "2025"
  },
  {
    id: "skrt",
    title: "SKRT",
    category: "Logistics / Web Platform",
    headline: "Logistics & Fleet Technology Platform",
    description:
      "A digital logistics platform designed to bring freight operations, fleet visibility, shipment tracking, and customer access into one modern web experience.",
    liveUrl: "https://www.skrt.company/",
    ctaText: "Visit Website ↗",
    technology: [
      "Logistics Platform",
      "Fleet Tracking",
      "Shipment Visibility",
      "Web Architecture",
      "UI/UX Experience"
    ],
    capabilities: [
      "Road Freight Visibility",
      "Real-Time Fleet & Shipment Tracking",
      "Warehouse Support Interfaces",
      "Dispatch & Routing Information",
      "Customer Operations Portal"
    ],
    year: "2024"
  }
];
