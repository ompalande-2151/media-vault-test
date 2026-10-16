import { articles, categories, issues, leaders, authors, videos, site } from "./data";
import type { Article } from "./types";
export function isLive(article: Article, region = "in", now = new Date()) {
  return (
    article.status === "published" &&
    article.region === region &&
    new Date(article.publishedAt) <= now
  );
}
export function getArticles(category?: string, subcategory?: string) {
  return articles.filter(
    (a) =>
      isLive(a) &&
      (!category || a.category === category) &&
      (!subcategory || a.subcategory === subcategory),
  );
}
export function getArticle(slug: string) {
  return getArticles().find((a) => a.slug === slug);
}
export function getCategories() {
  return categories;
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function getLeaders() {
  return leaders;
}
export function getLeader(slug: string) {
  return leaders.find((l) => l.slug === slug);
}
export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
export function getAuthors() {
  return authors;
}
export function getIssues() {
  return issues;
}
export function getIssue(slug: string) {
  return issues.find((i) => i.slug === slug);
}
export function getVideos() {
  return videos;
}
export function getVideo(slug: string) {
  return videos.find((v) => v.slug === slug);
}
export function shouldShowRegionSwitcher(regions = site.regions) {
  return regions.filter((r) => r.active).length >= 2;
}
export function subSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface HeroStoryItem {
  categorySlug: string;
  categoryLabel: string;
  article: Article;
}

export function getHeroFeaturedArticles(): HeroStoryItem[] {
  const allCategories = getCategories();
  const items: HeroStoryItem[] = [];

  for (const cat of allCategories) {
    const list = getArticles(cat.slug);
    if (list.length > 0) {
      const sorted = [...list].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
      items.push({
        categorySlug: cat.slug,
        categoryLabel: cat.name,
        article: sorted[0],
      });
    }
  }
  return items;
}

export function getCategoryLabel(slug: string): string {
  const cat = getCategory(slug);
  return cat ? cat.name : slug;
}

export function getBriefArticles(count = 3): Article[] {
  // Sort dynamically by newest published date
  const sorted = [...getArticles()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const result: Article[] = [];
  const seenCategories = new Set<string>();

  // Select newest articles ensuring diverse category representation
  for (const article of sorted) {
    if (!seenCategories.has(article.category)) {
      result.push(article);
      seenCategories.add(article.category);
      if (result.length >= count) break;
    }
  }

  // Backfill if needed
  if (result.length < count) {
    for (const article of sorted) {
      if (!result.some((r) => r.slug === article.slug)) {
        result.push(article);
        if (result.length >= count) break;
      }
    }
  }

  return result;
}
