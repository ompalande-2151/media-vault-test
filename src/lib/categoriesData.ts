import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "leadership",
    name: "Leadership",
    intro: "Decisions, lessons and the people making them.",
    subs: ["CEO & CXO", "Women in Leadership", "Emerging Leaders", "Leadership Lessons"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    intro: "Strategy and operations inside India's industrial corridors.",
    subs: ["Strategy", "Digital Transformation", "Innovation", "Operations", "Sustainability"],
  },
  {
    slug: "msme-growth",
    name: "MSME & Growth",
    intro: "Practical playbooks for small businesses that want to scale.",
    subs: ["Sales & Marketing", "Finance", "People & Culture", "Productivity", "Expansion"],
  },
  {
    slug: "startups-founders",
    name: "Startups & Founders",
    intro: "Early-stage stories and lessons.",
    subs: ["Founder Stories", "Startup Spotlight", "Funding", "Product & Innovation", "Scaling"],
  },
  {
    slug: "industries",
    name: "Industries",
    intro: "Sector outlooks across ten industries.",
    subs: [
      "Technology",
      "Manufacturing",
      "Healthcare",
      "Finance",
      "Retail & E-commerce",
      "Education",
      "Real Estate",
      "Energy",
      "Logistics",
      "Hospitality",
    ],
  },
  {
    slug: "insights",
    name: "Insights",
    intro: "Analysis, guides, opinion, research and case studies.",
    subs: ["Analysis", "Practical Guides", "Opinion", "Research & Reports", "Case Studies"],
  },
];

export const categories = CATEGORIES;
