import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVideo, getVideos } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getVideoJsonLd, safeJsonLd } from "@/lib/structured-data";
import { VideoPlayer } from "./video-player";

export async function generateStaticParams() {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) {
    return createNotFoundMetadata("Conversation Unavailable");
  }
  return createMetadata({
    title: `${video.title} | CEO Voice`,
    description: video.summary,
    canonicalPath: `/video/${video.slug}`,
    ogType: "website",
    ogImage: video.image,
  });
}

export default async function VideoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "CEO Voice", path: "/video" },
    { name: v.title, path: `/video/${v.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getVideoJsonLd(v)),
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
          <span className="eyebrow">{v.series} · Illustrative conversation</span>
          <h1>{v.title}</h1>
          <p>{v.summary}</p>
        </div>
        <VideoPlayer title={v.title} image={v.image} providerId={v.providerId} />
        <div className="prose-page mt-8">
          <h2>The perspective</h2>
          <p>{v.transcript}</p>
          <p>
            This sample conversation is illustrative. An approved video and captions will be added
            before publication.
          </p>
        </div>
      </div>
    </>
  );
}
