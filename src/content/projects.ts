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

export interface ManagedSocialItem {
  id: string;
  clientName: string;
  service: string;
  accountType: string;
  description: string;
  instagramUrl: string;
  ctaText: string;
}

export interface StudioSocial {
  instagram: {
    url: string;
    handle: string;
    label: string;
  };
  linkedin: {
    url: string;
    label: string;
  };
}

export const selectedWorkData: ProjectItem[] = [
  {
    id: "skrt",
    title: "SKRT",
    category: "Logistics & Fleet Technology",
    headline: "Logistics & Fleet Technology Platform",
    description:
      "A digital logistics platform designed to bring freight operations, fleet visibility, shipment tracking, and customer access into one modern web experience.",
    liveUrl: "https://www.skrt.company/",
    ctaText: "View SKRT",
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

export const managedSocialAccounts: ManagedSocialItem[] = [
  {
    id: "dulhan-jewellery",
    clientName: "Dulhan Jewellery",
    service: "Social Media Management",
    accountType: "Managed Client Account",
    description:
      "Strategic social media management, brand presence curation, visual storytelling, and digital audience engagement for fine bridal and celebratory jewellery.",
    instagramUrl: "https://www.instagram.com/dulhan_jewellery__/",
    ctaText: "View Instagram"
  },
  {
    id: "kalakriti-by-nikita",
    clientName: "Kalakriti by Nikita",
    service: "Social Media Management",
    accountType: "Managed Client Account",
    description:
      "Comprehensive social media management, visual creative direction, and audience communication highlighting bespoke artisanal fashion and handcrafted couture.",
    instagramUrl: "https://www.instagram.com/kalakritiby_nikita/",
    ctaText: "View Instagram"
  }
];

export const studioSocialPresence: StudioSocial = {
  instagram: {
    url: "https://www.instagram.com/cosmichameleon.io/",
    handle: "@cosmichameleon.io",
    label: "Follow @cosmichameleon.io"
  },
  linkedin: {
    url: "https://www.linkedin.com/company/cosmichameleon",
    label: "Connect on LinkedIn"
  }
};

// Aliased for 3D Scene / legacy consumers
export const projectsData: ProjectItem[] = selectedWorkData;
