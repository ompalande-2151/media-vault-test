import type { Article } from "./types";
import { ENTERPRISE_ARTICLES } from "./enterpriseData";
import { LEADERSHIP_ARTICLES } from "./leadershipData";
import { STARTUPS_FOUNDERS_ARTICLES } from "./startupsFoundersData";
import { INDUSTRIES_ARTICLES } from "./industriesData";
import { MSME_GROWTH_ARTICLES } from "./msmeGrowthData";
import { INSIGHTS_ARTICLES } from "./insightsData";

export const ARTICLES: Article[] = [
  ...ENTERPRISE_ARTICLES,
  ...LEADERSHIP_ARTICLES,
  ...STARTUPS_FOUNDERS_ARTICLES,
  ...INDUSTRIES_ARTICLES,
  ...MSME_GROWTH_ARTICLES,
  ...INSIGHTS_ARTICLES,
];

export const articles = ARTICLES;
