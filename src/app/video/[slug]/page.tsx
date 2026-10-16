import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVideo, getVideos } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
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
  if (!video)
    return createMetadata("Conversation unavailable", "Explore CEO Voice on MediaVault Global.");
  return createMetadata(video.title, video.summary);
}

export default async function VideoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();

  return (
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
  );
}
