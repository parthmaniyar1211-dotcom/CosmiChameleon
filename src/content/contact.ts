export const projectTypes = [
  "Website",
  "Custom Software",
  "AI Solution",
  "Automation",
  "E-Commerce",
  "UI/UX",
  "Digital Transformation",
  "Custom Product",
  "Other"
] as const;

export type ProjectType = typeof projectTypes[number];

export const budgetRanges = [
  "< $5,000",
  "$5,000 - $15,000",
  "$15,000 - $35,000",
  "$35,000 - $75,000",
  "$75,000+"
] as const;

export const contactInfo = {
  directEmail: "hello@cosmichameleon.com",
  location: "Global Studio",
  availability: "Currently accepting select projects for Q2/Q3",
  responseTime: "Inquiries reviewed within 24 business hours"
};
