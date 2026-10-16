import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getVideos } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "CEO Voice & founder conversations",
  "Leadership conversations and ideas from the people building what comes next.",
);

export default function VideoIndexPage() {
  const videos = getVideos();

  return (
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
              <img
                src={v.image}
                alt="Illustrative CEO Voice conversation"
                width={1024}
                height={600}
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
  );
}
