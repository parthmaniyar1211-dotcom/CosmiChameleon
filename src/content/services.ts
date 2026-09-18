export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  whoIsItFor: string;
  description: string;
  capabilities: string[];
  icon: string;
  orbitAngle: number;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    tagline: "High-performance digital platforms and web applications.",
    whoIsItFor: "Companies and organizations needing high-speed, custom web platforms designed for conversion and brand authority.",
    description:
      "Modern websites, business platforms, landing pages, institutional websites, and high-conversion web experiences engineered for speed, SEO, and visual distinction.",
    capabilities: [
      "High-speed modern business platforms",
      "Interactive landing & product experiences",
      "Custom web applications & client portals",
      "Headless CMS integration & architecture",
      "Full website modernization & redesign"
    ],
    icon: "Globe",
    orbitAngle: 0
  },
  {
    id: "custom-software",
    number: "02",
    title: "Custom Software",
    tagline: "Tailored software systems built around your operational architecture.",
    whoIsItFor: "Teams outgrowing off-the-shelf software, spreadsheets, or rigid commercial tools.",
    description:
      "Proprietary software tools, internal operational systems, client portals, and secure APIs engineered specifically for your business workflows rather than rigid off-the-shelf software.",
    capabilities: [
      "Custom internal workflow software",
      "Client & partner web portals",
      "API design, microservices & integrations",
      "Database architecture & optimization",
      "Legacy software refactoring"
    ],
    icon: "Code2",
    orbitAngle: (Math.PI * 2) / 7
  },
  {
    id: "ai-solutions",
    number: "03",
    title: "AI Solutions",
    tagline: "Intelligent systems turning complex data into business leverage.",
    whoIsItFor: "Businesses wanting to embed generative models, document parsing, and automated intelligence directly into workflows.",
    description:
      "Custom AI pipelines, retrieval-augmented generation (RAG), intelligent agents, document parsing, and predictive models seamlessly embedded into your daily operational workflow.",
    capabilities: [
      "Domain-specific AI assistants & agents",
      "Intelligent document & unstructured data extraction",
      "Semantic search & enterprise knowledge bases",
      "Computer vision & multimodal pipelines",
      "Predictive analytics & intelligent triage"
    ],
    icon: "Cpu",
    orbitAngle: ((Math.PI * 2) / 7) * 2
  },
  {
    id: "business-automation",
    number: "04",
    title: "Business Automation",
    tagline: "Autonomous workflows that eliminate manual friction.",
    whoIsItFor: "Organizations looking to eliminate repetitive data re-entry, disconnected tools, and manual processes.",
    description:
      "Connecting disconnected SaaS tools, automating multi-step approvals, synchronizing databases, and building robust end-to-end automation pipelines that save hours every single day.",
    capabilities: [
      "Cross-platform CRM & ERP integration",
      "Automated lead routing & customer journeys",
      "Financial reporting & invoice reconciliation pipelines",
      "Event-driven cloud webhook architectures",
      "Error-resilient background job scheduling"
    ],
    icon: "Zap",
    orbitAngle: ((Math.PI * 2) / 7) * 3
  },
  {
    id: "ecommerce",
    number: "05",
    title: "E-Commerce Systems",
    tagline: "Scalable commercial platforms designed for effortless transactions.",
    whoIsItFor: "Direct-to-consumer brands and B2B distributors requiring fast checkouts, scalable catalogs, and custom ERP sync.",
    description:
      "Custom e-commerce storefronts, B2B wholesale portals, multi-currency checkout engines, and inventory sync systems focused on conversion, speed, and reliability.",
    capabilities: [
      "Custom headless storefronts",
      "B2B bulk ordering & tier-pricing platforms",
      "Payment gateway & subscription systems",
      "Real-time inventory & ERP synchronization",
      "Performance optimization & cart conversion audits"
    ],
    icon: "ShoppingCart",
    orbitAngle: ((Math.PI * 2) / 7) * 4
  },
  {
    id: "ui-ux",
    number: "06",
    title: "UI/UX Experience Design",
    tagline: "Intuitive digital interfaces that make complex software simple.",
    whoIsItFor: "Product founders and engineering teams who need complex software turned into intuitive, elegant interfaces.",
    description:
      "Human-centered product design, design systems, interactive prototypes, and conversion-focused interface architecture crafted with obsessive attention to ergonomics and micro-interactions.",
    capabilities: [
      "Product discovery & user journey mapping",
      "Interactive high-fidelity prototypes",
      "Scalable multi-brand design systems",
      "SaaS dashboard & application UX design",
      "Accessibility & responsive usability audits"
    ],
    icon: "Layout",
    orbitAngle: ((Math.PI * 2) / 7) * 5
  },
  {
    id: "digital-transformation",
    number: "07",
    title: "Digital Transformation",
    tagline: "Modernizing organizations to compete and thrive in a digital era.",
    whoIsItFor: "Institutions and established companies modernizing legacy tech stacks and offline workflows.",
    description:
      "End-to-end modernization strategy, cloud migrations, workflow digitization, and architectural consulting to transition traditional operations into agile, automated modern enterprises.",
    capabilities: [
      "Technical infrastructure assessment",
      "Paper-to-cloud operational migration",
      "Scalable cloud deployment architectures",
      "Team enablement & technology playbooks",
      "Security, compliance, & reliability hardening"
    ],
    icon: "Layers",
    orbitAngle: ((Math.PI * 2) / 7) * 6
  }
];
