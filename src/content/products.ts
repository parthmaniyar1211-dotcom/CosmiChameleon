export interface ProductItem {
  id: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  features: { label: string; detail: string }[];
  tags?: string[];
  workflowNodes?: string[];
  liveUrl: string;
  ctaText: string;
  visualType: "security-platform" | "email-automation" | "voice-agent";
}

export const productsData: ProductItem[] = [
  {
    id: "shieldscope",
    badge: "LAB PRODUCT 01",
    title: "ShieldScope",
    headline: "Continuous website security posture, vulnerability auditing, and attack surface intelligence.",
    description:
      "An automated web security intelligence engine designed to detect configuration drift, monitor SSL/TLS certificates, scan for exposed vulnerabilities, and enforce perimeter defense across web assets.",
    tags: ["Perimeter Defense", "CVE Scans", "SSL Auditing", "Zero-Day Alerts"],
    liveUrl: "https://shieldscope.netlify.app/",
    features: [
      {
        label: "Continuous Surface Discovery",
        detail: "Crawls domain perimeters, public subdomains, open ports, and API endpoints around the clock."
      },
      {
        label: "Vulnerability & CVE Correlation",
        detail: "Cross-references active software libraries against live national vulnerability databases."
      },
      {
        label: "SSL/TLS & Header Enforcement",
        detail: "Monitors certificate expiration, cipher suites, HSTS preloading, and CSP policy health."
      },
      {
        label: "Automated Incident Alerting",
        detail: "Dispatches actionable mitigation playbooks directly into Slack, Discord, or security webhooks."
      }
    ],
    ctaText: "Open Product ↗",
    visualType: "security-platform"
  },
  {
    id: "mailx",
    badge: "LAB PRODUCT 02",
    title: "MailX",
    headline: "High-throughput transactional email infrastructure with intelligent deliverability orchestration.",
    description:
      "A modern transactional and automated email delivery engine engineered to handle dynamic templating, deliverability protection, bounce mitigation, and event-driven communication pipelines.",
    tags: ["Dynamic Templating", "DKIM/DMARC", "Event Pipeline", "Inbox Routing"],
    workflowNodes: ["Event Ingest", "Template Render", "DKIM Sign", "Reputation Guard", "Inbox Delivery"],
    liveUrl: "https://mailx-mu.vercel.app/",
    features: [
      {
        label: "Dynamic Template Compilation",
        detail: "Compiles personalized, responsive emails instantly with type-safe variable injection."
      },
      {
        label: "Deliverability & Reputation Guard",
        detail: "Continuously tracks IP warmth, bounce rates, and spam trap signals to protect sender scores."
      },
      {
        label: "Event-Driven Drip Orchestration",
        detail: "Triggers chained sequences based on real-time user behavior, app webhooks, and billing events."
      },
      {
        label: "Unified Telemetry & Webhooks",
        detail: "Streams real-time delivery confirmations, opens, clicks, and bounce logs to your data warehouse."
      }
    ],
    ctaText: "Open Product ↗",
    visualType: "email-automation"
  },
  {
    id: "voice-agent",
    badge: "LAB PRODUCT 03",
    title: "Voice Agent",
    headline: "Real-time bidirectional AI voice interaction platform for automated operations and caller support.",
    description:
      "An ultra-low-latency voice conversational platform capable of holding fluid, natural customer dialogues, executing multi-step business actions in real time, and bridging directly to phone networks.",
    tags: ["Low Latency", "Neural TTS", "Streaming ASR", "SIP & WebRTC"],
    liveUrl: "https://voice-agent-lac-ten.vercel.app/login",
    features: [
      {
        label: "Streaming Speech & Acoustic Parsing",
        detail: "Ultra-fast speech recognition and neural synthesis designed for natural human conversational cadences."
      },
      {
        label: "Intelligent Interruption Handling",
        detail: "Seamlessly detects user speech mid-sentence, stops talking immediately, and re-evaluates intent."
      },
      {
        label: "Autonomous Business Tool Calling",
        detail: "Queries databases, schedules calendar slots, processes orders, and updates CRMs during calls."
      },
      {
        label: "Telephony & WebRTC Bridges",
        detail: "Integrates with existing PBX, Twilio, and mobile or web browser audio streams out of the box."
      }
    ],
    ctaText: "Open Product ↗",
    visualType: "voice-agent"
  }
];
