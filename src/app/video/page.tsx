import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getVideos } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, safeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "CEO Voice & Founder Conversations | MediaVault Global",
  description: "Leadership conversations and ideas from the people building what comes next.",
  canonicalPath: "/video",
  ogType: "website",
});

export default function VideoIndexPage() {
  const videos = getVideos();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Video", path: "/video" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            getCollectionPageJsonLd(
              "CEO Voice & Founder Conversations",
              "Leadership conversations and ideas from the people building what comes next.",
              "/video",
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <div className="site-container pb-14">
        <div className="page-heading">
          <span className="eyebrow">Watch. Listen. Think differently.</span>
          <h1>Conversations that matter.</h1>
          <p>CEO voices, founder talks and 60-second briefs.</p>
        </div>
        <div className="story-grid">
          {videos.map((v) => (
            <article className="story-card" key={v.slug}>
              <Link href={`/video/${v.slug}`} className="story-image">
                <Image
                  src={v.image}
                  alt="Illustrative CEO Voice conversation"
                  width={640}
                  height={376}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  quality={75}
                />
              </Link>
              <span className="eyebrow">{v.series} · Preview</span>
              <h3>
                <Link href={`/video/${v.slug}`}>{v.title}</Link>
              </h3>
              <p>{v.summary}</p>
              <Link href={`/video/${v.slug}`} className="text-link">
                Explore the conversation
                <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
