export const projectInterests = [
  "AI Solutions & Agents",
  "Business Automation",
  "Custom Software",
  "Web Applications",
  "SaaS Products",
  "Digital Transformation",
  "E-Commerce Technology",
  "UI/UX Systems",
  "Other"
] as const;

export type ProjectInterest = typeof projectInterests[number];

// Alias for backwards compatibility
export const projectTypes = projectInterests;
export type ProjectType = ProjectInterest;

export const contactInfo = {
  directEmail: "hello@cosmichameleon.com",
  location: "Global Studio",
  availability: "Accepting select engineering & digital product initiatives",
  responseTime: "Inquiries reviewed within 24 business hours"
};
