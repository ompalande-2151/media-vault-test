import type { Metadata } from "next";
import type { Article } from "./types";

export const SITE_CONFIG = {
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://mediavaultglobal.com"
  ).replace(/\/+$/, ""),
  siteName: "MediaVault Global",
  publisherName: "MediaVault Global",
  defaultTitle: "MediaVault Global | Business, leadership & what comes next",
  titleTemplate: "%s | MediaVault Global",
  defaultDescription:
    "The people, ideas and businesses shaping what comes next — from India to the world. Explore MediaVault Global.",
  defaultOgImage: "/assets/LOGO PNG - MVGM.png",
  logoUrl: "/assets/LOGO PNG - MVGM.png",
  iconUrl: "/assets/ICON - MVGM.png",
  locale: "en_IN",
  language: "en-IN",
  region: "IN",
  foundingDate: "2026",
  email: "tips@mediavaultglobal.com",
  editorialContact: "tips@mediavaultglobal.com",
  correctionsContact: "corrections@mediavaultglobal.com",
  partnershipsContact: "partnerships@mediavaultglobal.com",
};

/**
 * Normalizes a relative path:
 * - Ensures single leading slash
 * - Strips trailing slash (except root)
 * - Removes query strings and hashes
 * - Lowercases URL path
 */
export function normalizePath(path: string): string {
  if (!path) return "/";
  // Remove query params and hash
  const clean = path.split(/[?#]/)[0] ?? "/";
  let normalized = clean.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  // Collapse multiple leading slashes
  normalized = normalized.replace(/^\/+/, "/");
  // Remove trailing slashes unless it's just "/"
  normalized = normalized.replace(/\/+$/, "") || "/";
  return normalized;
}

/**
 * Converts a relative path or partial URL into an absolute production URL
 * based on the validated site origin.
 */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_CONFIG.siteUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    try {
      const parsed = new URL(pathOrUrl);
      const normalizedPath = normalizePath(parsed.pathname);
      return `${parsed.origin}${normalizedPath === "/" ? "" : normalizedPath}`;
    } catch {
      return pathOrUrl;
    }
  }
  const cleanPath = normalizePath(pathOrUrl);
  return `${SITE_CONFIG.siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Returns a canonical URL for a given relative path or URL.
 */
export function getCanonicalUrl(pathOrUrl: string): string {
  return toAbsoluteUrl(pathOrUrl);
}

/**
 * Returns the canonical relative path for an article.
 */
export function getArticleCanonicalPath(article: Pick<Article, "slug" | "canonicalUrl">): string {
  if (article.canonicalUrl) {
    return normalizePath(article.canonicalUrl);
  }
  return `/article/${article.slug}`;
}

/**
 * Returns the canonical absolute URL for an article.
 */
export function getArticleCanonicalUrl(article: Pick<Article, "slug" | "canonicalUrl">): string {
  return toAbsoluteUrl(getArticleCanonicalPath(article));
}

export interface MetadataOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?:
    | string
    | {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Centralized Next.js Metadata creator.
 * Supports both modern options object or classic (title, description) signature.
 */
export function createMetadata(
  optionsOrTitle: string | MetadataOptions,
  legacyDescription?: string,
): Metadata {
  const options: MetadataOptions =
    typeof optionsOrTitle === "string"
      ? { title: optionsOrTitle, description: legacyDescription }
      : optionsOrTitle;

  const titleRaw = options.title.trim();
  const title = titleRaw.includes(SITE_CONFIG.siteName)
    ? titleRaw
    : `${titleRaw} | ${SITE_CONFIG.siteName}`;

  const description = options.description?.trim() || SITE_CONFIG.defaultDescription;
  const canonicalUrl = options.canonicalPath ? getCanonicalUrl(options.canonicalPath) : undefined;

  let ogImageUrl: string;
  let ogImageAlt: string;
  let ogImageWidth = 1200;
  let ogImageHeight = 630;

  if (typeof options.ogImage === "string") {
    ogImageUrl = toAbsoluteUrl(options.ogImage);
    ogImageAlt = titleRaw;
  } else if (options.ogImage && typeof options.ogImage === "object") {
    ogImageUrl = toAbsoluteUrl(options.ogImage.url);
    ogImageAlt = options.ogImage.alt || titleRaw;
    if (options.ogImage.width) ogImageWidth = options.ogImage.width;
    if (options.ogImage.height) ogImageHeight = options.ogImage.height;
  } else {
    ogImageUrl = toAbsoluteUrl(SITE_CONFIG.defaultOgImage);
    ogImageAlt = SITE_CONFIG.siteName;
  }

  const isArticle = options.ogType === "article";

  const robots = options.noIndex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
        },
      };

  const metadata: Metadata = {
    title,
    description,
    robots,
    openGraph: {
      title,
      description,
      type: isArticle ? "article" : "website",
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
      ...(isArticle && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime || options.publishedTime,
        authors: options.authors,
        section: options.section,
        tags: options.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };

  if (canonicalUrl) {
    metadata.alternates = {
      canonical: canonicalUrl,
    };
  }

  if (options.keywords && options.keywords.length > 0) {
    metadata.keywords = options.keywords;
  }

  return metadata;
}

/**
 * Returns metadata for non-existent content with noindex.
 */
export function createNotFoundMetadata(title = "Page Not Found"): Metadata {
  return {
    title: `${title} | ${SITE_CONFIG.siteName}`,
    description: "The requested page could not be found on MediaVault Global.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
