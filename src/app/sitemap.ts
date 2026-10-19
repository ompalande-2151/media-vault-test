import type { MetadataRoute } from "next";
import {
  getArticles,
  getCategories,
  getAuthors,
  getLeaders,
  getIssues,
  getVideos,
  subSlug,
  isLive,
} from "@/lib/queries";
import { toAbsoluteUrl, getArticleCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Homepage
  routes.push({
    url: toAbsoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // 2. Main Categories & Canonical Subcategories
  const categories = getCategories();
  for (const cat of categories) {
    routes.push({
      url: toAbsoluteUrl(`/category/${cat.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const sub of cat.subs) {
      routes.push({
        url: toAbsoluteUrl(`/category/${cat.slug}/${subSlug(sub)}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // 3. Published Live Articles (only canonical, indexable articles)
  const articles = getArticles();
  for (const article of articles) {
    if (!isLive(article) || article.noIndex || article.status !== "published") {
      continue;
    }

    const pubDate = new Date(article.updatedAt || article.publishedAt);
    routes.push({
      url: getArticleCanonicalUrl(article),
      lastModified: isNaN(pubDate.getTime()) ? new Date() : pubDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // 4. Authors
  const authors = getAuthors();
  for (const author of authors) {
    routes.push({
      url: toAbsoluteUrl(`/authors/${author.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // 5. Leaders Spotlight
  const leaders = getLeaders();
  for (const leader of leaders) {
    routes.push({
      url: toAbsoluteUrl(`/leaders/${leader.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // 6. Magazine Archive & Issues
  routes.push({
    url: toAbsoluteUrl("/magazine"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  });

  const issues = getIssues();
  for (const issue of issues) {
    routes.push({
      url: toAbsoluteUrl(`/magazine/${issue.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // 7. Video Section & Videos
  routes.push({
    url: toAbsoluteUrl("/video"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  const videos = getVideos();
  for (const video of videos) {
    routes.push({
      url: toAbsoluteUrl(`/video/${video.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // 8. Core Editorial, About, Partnership & Policy Pages
  const staticPages = [
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about/editorial-standards", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about/team", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/about/contribute", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/about/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/partner", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/partner/advertise", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/partner/sponsored-content", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/partner/awards-events", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/partner/press-releases", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/submit-a-story", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/editorial-policy", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/corrections", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  for (const page of staticPages) {
    routes.push({
      url: toAbsoluteUrl(page.path),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  return routes;
}
