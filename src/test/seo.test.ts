import { describe, expect, it } from "vitest";
import {
  SITE_CONFIG,
  normalizePath,
  toAbsoluteUrl,
  getCanonicalUrl,
  getArticleCanonicalPath,
  getArticleCanonicalUrl,
  createMetadata,
  createNotFoundMetadata,
} from "@/lib/seo";
import {
  safeJsonLd,
  getWebsiteJsonLd,
  getOrganizationJsonLd,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getAuthorProfileJsonLd,
  getLeaderJsonLd,
  getVideoJsonLd,
  getCollectionPageJsonLd,
  getPublicationIssueJsonLd,
} from "@/lib/structured-data";
import {
  getArticles,
  getArticle,
  getCategories,
  getAuthors,
  getLeaders,
  getIssues,
  getVideos,
  isLive,
  subSlug,
} from "@/lib/queries";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "../../next.config.mjs";

describe("SEO Architecture & Canonical URLs", () => {
  it("normalizes paths correctly", () => {
    expect(normalizePath("")).toBe("/");
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("article/sample/")).toBe("/article/sample");
    expect(normalizePath("/category/enterprise/?sort=asc#top")).toBe("/category/enterprise");
    expect(normalizePath("//double-slash//")).toBe("/double-slash");
  });

  it("produces valid absolute canonical URLs matching site origin", () => {
    const origin = SITE_CONFIG.siteUrl;
    expect(getCanonicalUrl("/")).toBe(origin);
    expect(getCanonicalUrl("/about")).toBe(`${origin}/about`);
    expect(getCanonicalUrl("/article/sample-slug")).toBe(`${origin}/article/sample-slug`);
    expect(getCanonicalUrl(`${origin}/category/enterprise`)).toBe(`${origin}/category/enterprise`);
  });

  it("canonical paths for articles point directly to /article/[slug]", () => {
    const articles = getArticles();
    expect(articles.length).toBeGreaterThan(0);
    for (const a of articles) {
      const canonicalPath = getArticleCanonicalPath(a);
      expect(canonicalPath).toMatch(/^\/article\/[a-z0-9-]+$/);
      const canonicalUrl = getArticleCanonicalUrl(a);
      expect(canonicalUrl).toBe(`${SITE_CONFIG.siteUrl}${canonicalPath}`);
    }
  });
});

describe("Metadata Generation", () => {
  it("generates correct website metadata with OpenGraph and Twitter cards", () => {
    const meta = createMetadata({
      title: "Business & Leadership",
      description: "Sample description",
      canonicalPath: "/sample",
      ogType: "website",
    });

    expect(meta.title).toBe("Business & Leadership | MediaVault Global");
    expect(meta.description).toBe("Sample description");
    expect(meta.alternates?.canonical).toBe(`${SITE_CONFIG.siteUrl}/sample`);
    expect((meta.openGraph as Record<string, unknown>)?.type).toBe("website");
    expect(meta.openGraph?.siteName).toBe("MediaVault Global");
    expect((meta.twitter as Record<string, unknown>)?.card).toBe("summary_large_image");
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });

  it("generates article-specific metadata with article OG fields", () => {
    const a = getArticles()[0];
    expect(a).toBeDefined();

    const meta = createMetadata({
      title: a.headline,
      description: a.summary,
      canonicalPath: getArticleCanonicalPath(a),
      ogType: "article",
      publishedTime: a.publishedAt,
      section: a.category,
      tags: a.tags,
    });

    expect((meta.openGraph as Record<string, unknown>)?.type).toBe("article");
    expect(meta.alternates?.canonical).toBe(`${SITE_CONFIG.siteUrl}/article/${a.slug}`);
    expect((meta.openGraph as Record<string, unknown>)?.publishedTime).toBe(a.publishedAt);
  });

  it("ensures different articles do not share identical metadata", () => {
    const articles = getArticles().slice(0, 5);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const canonicals = new Set<string>();

    for (const a of articles) {
      const meta = createMetadata({
        title: a.headline,
        description: a.summary,
        canonicalPath: getArticleCanonicalPath(a),
      });
      titles.add(meta.title as string);
      descriptions.add(meta.description as string);
      canonicals.add(meta.alternates?.canonical as string);
    }

    expect(titles.size).toBe(articles.length);
    expect(descriptions.size).toBe(articles.length);
    expect(canonicals.size).toBe(articles.length);
  });

  it("handles missing/not-found metadata by returning noindex", () => {
    const notFoundMeta = createNotFoundMetadata("Article Not Found");
    expect(notFoundMeta.title).toBe("Article Not Found | MediaVault Global");
    expect(notFoundMeta.robots).toMatchObject({ index: false, follow: false });
  });

  it("supports noIndex flag for low-value search/filter combinations", () => {
    const noIndexMeta = createMetadata({
      title: "Search Results",
      canonicalPath: "/search",
      noIndex: true,
    });
    expect(noIndexMeta.robots).toMatchObject({ index: false, follow: false });
  });
});

describe("Structured Data (JSON-LD)", () => {
  it("escapes script tags to prevent XSS", () => {
    const dangerous = { test: "</script><script>alert('xss')</script>" };
    const serialized = safeJsonLd(dangerous);
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("generates valid WebSite JSON-LD with search action", () => {
    const websiteLd = getWebsiteJsonLd();
    expect(websiteLd["@type"]).toBe("WebSite");
    expect(websiteLd.name).toBe("MediaVault Global");
    expect(websiteLd.potentialAction).toBeDefined();
    expect(websiteLd.potentialAction.target.urlTemplate).toContain(
      "/search?q={search_term_string}",
    );
  });

  it("generates valid NewsMediaOrganization JSON-LD with logo and policies", () => {
    const orgLd = getOrganizationJsonLd();
    expect(orgLd["@type"]).toBe("NewsMediaOrganization");
    expect(orgLd.name).toBe("MediaVault Global");
    expect(orgLd.logo.url).toMatch(/^https?:\/\//);
    expect(orgLd.publishingPrinciples).toContain("/about/editorial-standards");
    expect(orgLd.correctionsPolicy).toContain("/corrections");
  });

  it("generates valid Article JSON-LD reflecting real record data", () => {
    const article = getArticles()[0];
    const author = getAuthors()[0];
    const category = getCategories()[0];

    const articleLd = getArticleJsonLd(article, author, category);
    expect(articleLd["@context"]).toBe("https://schema.org");
    expect(articleLd.headline).toBe(article.title || article.headline);
    expect(articleLd.datePublished).toBe(article.publishedAt);
    expect(articleLd.mainEntityOfPage["@id"]).toBe(getArticleCanonicalUrl(article));
    expect(articleLd.publisher.name).toBe("MediaVault Global");
    expect(articleLd.inLanguage).toBe("en-IN");
  });

  it("generates accurate BreadcrumbList hierarchy matching site structure", () => {
    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: "Enterprise", path: "/category/enterprise" },
      { name: "Operations", path: "/category/enterprise/operations" },
      { name: "Story Headline", path: "/article/test-story" },
    ];
    const breadcrumbLd = getBreadcrumbJsonLd(breadcrumbs);
    expect(breadcrumbLd["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbLd.itemListElement).toHaveLength(4);
    expect(breadcrumbLd.itemListElement[0].position).toBe(1);
    expect(breadcrumbLd.itemListElement[0].name).toBe("Home");
    expect(breadcrumbLd.itemListElement[1].name).toBe("Enterprise");
    expect(breadcrumbLd.itemListElement[2].name).toBe("Operations");
    expect(breadcrumbLd.itemListElement[3].name).toBe("Story Headline");
  });
});

describe("XML Sitemap and Robots Directives", () => {
  it("generates sitemap containing only canonical, public, indexable URLs", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(0);

    const urls = entries.map((e) => e.url);

    // 1. Homepage is included
    expect(urls).toContain(toAbsoluteUrl("/"));

    // 2. Categories are included
    for (const c of getCategories()) {
      expect(urls).toContain(toAbsoluteUrl(`/category/${c.slug}`));
    }

    // 3. All live articles are included
    for (const a of getArticles()) {
      expect(urls).toContain(getArticleCanonicalUrl(a));
    }

    // 4. Drafts / unpublished articles must NEVER be in sitemap
    for (const entry of entries) {
      expect(entry.url).not.toContain("draft");
      expect(entry.url).not.toContain("/search"); // No search pages in sitemap
      expect(entry.url.startsWith("http")).toBe(true); // Must be absolute URLs
    }

    // 5. No duplicates in sitemap
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });

  it("excludes drafts and future-dated stories from public queries and sitemaps", () => {
    const sample = getArticles()[0];
    const draftArticle = { ...sample, slug: "test-draft-slug", status: "draft" as const };
    expect(isLive(draftArticle)).toBe(false);

    const futureArticle = {
      ...sample,
      slug: "test-future-slug",
      publishedAt: "2099-01-01T00:00:00Z",
    };
    expect(isLive(futureArticle)).toBe(false);

    const sitemapUrls = sitemap().map((e) => e.url);
    expect(sitemapUrls).not.toContain(toAbsoluteUrl(`/article/${draftArticle.slug}`));
    expect(sitemapUrls).not.toContain(toAbsoluteUrl(`/article/${futureArticle.slug}`));
  });

  it("robots.ts allows crawling of public pages and points to production sitemap", () => {
    const config = robots();
    expect(config.sitemap).toBe(toAbsoluteUrl("/sitemap.xml"));

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const wildCardRule = rules.find((r) => r.userAgent === "*");
    expect(wildCardRule).toBeDefined();
    expect(wildCardRule?.allow).toBe("/");
    expect(wildCardRule?.disallow).toContain("/search");
  });

  it("redirect rules do not contain loops and use permanent redirects", async () => {
    const getRedirects = nextConfig.redirects;
    expect(getRedirects).toBeDefined();
    const redirects = getRedirects ? await getRedirects() : [];
    expect(redirects.length).toBeGreaterThan(0);

    for (const r of redirects) {
      expect(r.permanent).toBe(true);
      // Destination should not equal source
      expect(r.source).not.toBe(r.destination);
    }
  });
});
