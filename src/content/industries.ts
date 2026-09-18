export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

export const industriesData: IndustryItem[] = [
  {
    id: "startups",
    name: "Startups & Emerging Tech",
    description: "Rapid MVP development, scalable digital architectures, and AI product foundations built for speed and investor confidence.",
    examples: ["SaaS platforms", "AI-driven MVPs", "Interactive product launches"]
  },
  {
    id: "ecommerce",
    name: "E-Commerce Brands",
    description: "High-speed storefronts, bespoke conversion funnels, custom inventory integrations, and automated order fulfillment.",
    examples: ["Headless shopping platforms", "Subscription portals", "Catalog automation"]
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Client intake portals, document processing pipelines, billing workflows, and modern high-credibility digital brand presences.",
    examples: ["Client portals", "Workflow automation", "Document parsing"]
  },
  {
    id: "education",
    name: "Education & Institutions",
    description: "Learning portals, student management workflows, interactive course environments, and institutional portals.",
    examples: ["Educational portals", "Application systems", "Interactive training"]
  },
  {
    id: "retail",
    name: "Retail & Modern Commerce",
    description: "Digital catalog management, omnichannel POS integrations, customer loyalty programs, and inventory synchronization.",
    examples: ["Inventory hubs", "Loyalty apps", "Omnichannel pipelines"]
  },
  {
    id: "real-estate",
    name: "Real Estate & Architecture",
    description: "Interactive property showcases, lead intake engines, automated scheduling, and CRM synchronization for modern brokerages.",
    examples: ["3D property tours", "Lead generation portals", "Agent dashboards"]
  },
  {
    id: "hospitality",
    name: "Hospitality & Dining",
    description: "Direct reservation systems, digital concierge experiences, menu management, and automated guest communication.",
    examples: ["Direct booking engines", "Guest notification loops", "Multi-venue sites"]
  },
  {
    id: "agencies",
    name: "Agencies & Creative Studios",
    description: "Specialized technical engineering partnerships, advanced 3D WebGL implementations, and custom web application delivery.",
    examples: ["White-label development", "Creative WebGL sites", "Complex integrations"]
  },
  {
    id: "smes",
    name: "SMEs & Growing Enterprises",
    description: "Replacing manual spreadsheets with streamlined custom software, automated accounting sync, and modern websites.",
    examples: ["Custom internal tools", "Automated invoicing", "Operations hubs"]
  },
  {
    id: "organizations",
    name: "Organizations & Non-Profits",
    description: "Member management systems, public reporting hubs, donation workflows, and mission-focused modern web applications.",
    examples: ["Member directories", "Resource hubs", "Impact reporting"]
  }
];
