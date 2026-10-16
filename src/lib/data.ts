export * from "./types";
export * from "./mediaAssets";
export * from "./categoriesData";
export * from "./leadershipData";
export * from "./enterpriseData";
export * from "./msmeGrowthData";
export * from "./startupsFoundersData";
export * from "./industriesData";
export * from "./insightsData";
export * from "./articlesData";
export * from "./leadersData";
export * from "./magazineData";
export * from "./videosData";
export * from "./authorsData";

import { imgManufacturing, imgLeader, imgFounders, imgEnergy } from "./mediaAssets";

export const site = {
  name: "MediaVault Global",
  regions: [{ code: "in", active: true, locale: "en-IN", timezone: "Asia/Kolkata" }],
  sampleContent: true,
};

export const images = {
  manufacturing: imgManufacturing,
  leader: imgLeader,
  founders: imgFounders,
  energy: imgEnergy,
};

export const specialProjects: { slug: string; title: string; active: boolean }[] = [];
