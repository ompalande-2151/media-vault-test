import type { Issue } from "./types";
import { imgManufacturing, imgFounders, imgEnergy } from "./mediaAssets";
import { ENTERPRISE_ARTICLES } from "./enterpriseData";
import { LEADERSHIP_ARTICLES } from "./leadershipData";
import { STARTUPS_FOUNDERS_ARTICLES } from "./startupsFoundersData";
import { INDUSTRIES_ARTICLES } from "./industriesData";

export const MAGAZINE_ISSUES: Issue[] = [
  {
    slug: "october-2026",
    month: "October",
    year: 2026,
    title: "The next chapter",
    theme: "Made in India. Built for the world.",
    image: imgManufacturing,
    stories: [
      ENTERPRISE_ARTICLES[0].slug,
      LEADERSHIP_ARTICLES[0].slug,
      STARTUPS_FOUNDERS_ARTICLES[0].slug,
      INDUSTRIES_ARTICLES[0].slug,
    ],
  },
  {
    slug: "september-2026",
    month: "September",
    year: 2026,
    title: "The builders",
    theme: "Ideas. Conviction. Impact.",
    image: imgFounders,
    stories: [STARTUPS_FOUNDERS_ARTICLES[0].slug, STARTUPS_FOUNDERS_ARTICLES[2].slug],
  },
  {
    slug: "august-2026",
    month: "August",
    year: 2026,
    title: "A greener future",
    theme: "The business of tomorrow.",
    image: imgEnergy,
    stories: [
      "india-clean-energy-solar-storage-factories",
      "karnataka-industrial-corridor-bengaluru-dharwad-belagavi-manufacturing",
    ],
  },
];

export const issues = MAGAZINE_ISSUES;
