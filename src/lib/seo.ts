import type { Metadata } from "next";

export function createMetadata(title: string, description?: string): Metadata {
  const full = title.includes("MediaVault Global") ? title : `${title} | MediaVault Global`;
  const desc = description ?? "MediaVault Global — India-first business magazine covering enterprise, leadership, MSMEs and founders.";
  return {
    title: full,
    description: desc,
    openGraph: {
      title: full,
      description: desc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description: desc,
    },
  };
}

export function pageHead(title: string, description: string) {
  const full = `${title} | MediaVault Global`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
