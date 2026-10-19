import { SITE_CONFIG, toAbsoluteUrl, getArticleCanonicalUrl } from "./seo";
import type { Article, Author, Category, Leader, Video, Issue } from "./types";

/**
 * Safely serializes data to a JSON-LD string, escaping '<' to prevent script-injection XSS.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Generates the Schema.org WebSite JSON-LD object with search potentialAction.
 */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.defaultDescription,
    inLanguage: SITE_CONFIG.language || "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates the Schema.org NewsMediaOrganization / Organization JSON-LD object.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_CONFIG.publisherName,
    url: SITE_CONFIG.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(SITE_CONFIG.logoUrl),
      width: 360,
      height: 70,
    },
    publishingPrinciples: toAbsoluteUrl("/about/editorial-standards"),
    correctionsPolicy: toAbsoluteUrl("/corrections"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: SITE_CONFIG.editorialContact,
      },
      {
        "@type": "ContactPoint",
        contactType: "corrections",
        email: SITE_CONFIG.correctionsContact,
      },
    ],
  };
}

/**
 * Generates the Schema.org BreadcrumbList JSON-LD object.
 */
export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

/**
 * Generates the Schema.org Article / NewsArticle JSON-LD object.
 */
export function getArticleJsonLd(article: Article, author?: Author, category?: Category) {
  const isOpinion = article.disclosure === "Opinion";
  const isSponsored = article.disclosure === "Sponsored";
  const schemaType = article.contentType || (isOpinion ? "OpinionNewsArticle" : "Article");

  const authorObject =
    author && author.slug !== "the-editorial-desk"
      ? {
          "@type": "Person",
          name: author.name,
          url: toAbsoluteUrl(`/authors/${author.slug}`),
        }
      : {
          "@type": "Organization",
          name: "MediaVault Global Editorial Desk",
          url: SITE_CONFIG.siteUrl,
        };

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getArticleCanonicalUrl(article),
    },
    headline: article.title || article.headline,
    description: article.metaDescription || article.summary,
    image: [toAbsoluteUrl(article.image)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: authorObject,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.publisherName,
      url: SITE_CONFIG.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(SITE_CONFIG.logoUrl),
      },
    },
    articleSection: category ? category.name : article.category,
    keywords:
      article.tags && article.tags.length > 0
        ? article.tags.join(", ")
        : article.keywords?.join(", "),
    inLanguage: SITE_CONFIG.language || "en-IN",
    isAccessibleForFree: "True",
    ...(isSponsored && {
      sponsor: {
        "@type": "Organization",
        name: "Commercial Partner",
      },
    }),
  };
}

/**
 * Generates Schema.org Person JSON-LD for an author profile.
 */
export function getAuthorProfileJsonLd(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      description: author.bio,
      url: toAbsoluteUrl(`/authors/${author.slug}`),
      worksFor: {
        "@type": "Organization",
        name: SITE_CONFIG.publisherName,
      },
    },
  };
}

/**
 * Generates Schema.org Person JSON-LD for a leader profile.
 */
export function getLeaderJsonLd(leader: Leader) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leader.name,
    jobTitle: leader.role,
    worksFor: {
      "@type": "Organization",
      name: leader.company,
    },
    description: leader.bio,
    image: toAbsoluteUrl(leader.image),
    url: toAbsoluteUrl(`/leaders/${leader.slug}`),
  };
}

/**
 * Generates Schema.org VideoObject JSON-LD.
 */
export function getVideoJsonLd(video: Video) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.summary,
    thumbnailUrl: [toAbsoluteUrl(video.image)],
    transcript: video.transcript,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.providerId}`,
    url: toAbsoluteUrl(`/video/${video.slug}`),
    uploadDate: "2026-10-01T08:00:00+05:30",
  };
}

/**
 * Generates Schema.org CollectionPage JSON-LD for category or archive pages.
 */
export function getCollectionPageJsonLd(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: toAbsoluteUrl(path),
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.publisherName,
      url: SITE_CONFIG.siteUrl,
    },
  };
}

/**
 * Generates Schema.org PublicationIssue JSON-LD.
 */
export function getPublicationIssueJsonLd(issue: Issue) {
  return {
    "@context": "https://schema.org",
    "@type": "PublicationIssue",
    name: `${issue.month} ${issue.year}: ${issue.title}`,
    issueNumber: issue.month,
    datePublished: `${issue.year}-10-01`,
    url: toAbsoluteUrl(`/magazine/${issue.slug}`),
    description: issue.theme,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.publisherName,
      url: SITE_CONFIG.siteUrl,
    },
  };
}
