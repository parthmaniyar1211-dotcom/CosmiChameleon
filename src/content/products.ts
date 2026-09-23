export interface ProductItem {
  id: string;
  badge: string;
  title: string;
  category: string;
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
    category: "Website Security & Intelligence Platform",
    headline: "Automated website security auditing, certificate telemetry, and attack surface intelligence.",
    description:
      "A web security intelligence platform providing automated surface discovery across SSL/TLS certificates, open ports, security headers, vulnerability detection, and DNS health.",
    tags: ["Surface Auditing", "SSL/TLS Telemetry", "Port Scanning", "DNS Verification"],
    liveUrl: "https://shieldscope.netlify.app/",
    features: [
      {
        label: "Continuous Surface Discovery",
        detail: "Automates domain perimeter audits, public subdomains, open ports, and API endpoints."
      },
      {
        label: "Security Header Verification",
        detail: "Audits CSP policies, HSTS configuration, X-Frame-Options, and referrer headers."
      },
      {
        label: "SSL/TLS & Certificate Analysis",
        detail: "Monitors certificate validity, cipher suites, expiration dates, and configuration integrity."
      },
      {
        label: "DNS & Configuration Audits",
        detail: "Correlates record hygiene, MX records, and perimeter configuration state."
      }
    ],
    ctaText: "Open ShieldScope",
    visualType: "security-platform"
  },
  {
    id: "mailx",
    badge: "LAB PRODUCT 02",
    title: "MailX",
    category: "Email Automation Platform",
    headline: "High-throughput transactional email infrastructure and deliverability orchestration.",
    description:
      "A transactional and automated email delivery engine engineered for dynamic template compilation, deliverability protection, bounce mitigation, and event-driven communication flows.",
    tags: ["Dynamic Templating", "DKIM/DMARC", "Event Pipeline", "Inbox Deliverability"],
    workflowNodes: ["Event Ingest", "Template Render", "DKIM Sign", "Reputation Guard", "Inbox Delivery"],
    liveUrl: "https://mailx-mu.vercel.app/",
    features: [
      {
        label: "Dynamic Template Compilation",
        detail: "Compiles personalized, responsive transactional emails with dynamic variable injection."
      },
      {
        label: "Deliverability & Reputation Guard",
        detail: "Monitors domain reputation, SPF/DKIM validation, and bounce mitigation protocols."
      },
      {
        label: "Event-Driven Automation Sequences",
        detail: "Triggers chained email dispatches based on user lifecycle triggers and real-time app events."
      },
      {
        label: "Unified Telemetry & Webhooks",
        detail: "Streams real-time delivery status, opens, clicks, and failure event webhooks."
      }
    ],
    ctaText: "Open MailX",
    visualType: "email-automation"
  },
  {
    id: "voice-agent",
    badge: "LAB PRODUCT 03",
    title: "Voice Agent",
    category: "AI Voice Interaction Platform",
    headline: "Real-time bidirectional AI voice interaction platform for operations and customer dialogue.",
    description:
      "A conversational voice platform capable of natural dialogue, streaming speech recognition, real-time tool execution, and browser or telephone audio bridging.",
    tags: ["Bidirectional Audio", "Neural Speech", "Streaming ASR", "Tool Calling"],
    liveUrl: "https://voice-agent-lac-ten.vercel.app/login",
    features: [
      {
        label: "Streaming Speech & Synthesis",
        detail: "Low-latency streaming speech recognition and acoustic synthesis designed for natural cadences."
      },
      {
        label: "Conversational Turn-Taking",
        detail: "Detects user interruptions mid-speech and adapts dialogue state dynamically."
      },
      {
        label: "Autonomous Business Tool Calling",
        detail: "Executes CRM updates, calendar scheduling, and structured business actions during calls."
      },
      {
        label: "Telephony & WebRTC Bridges",
        detail: "Connects to browser audio streams and telephony gateways with unified call state."
      }
    ],
    ctaText: "Open Voice Agent",
    visualType: "voice-agent"
  }
];
