"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoPlayer({
  title,
  image,
  providerId,
}: {
  title: string;
  image: string;
  providerId: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && providerId) {
    return (
      <iframe
        title={title}
        className="w-full aspect-video"
        src={`https://www.youtube-nocookie.com/embed/${providerId}?autoplay=1&cc_load_policy=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }

  return (
    <div className="video-poster max-w-4xl">
      <img
        src={image}
        alt="AI-generated illustrative leadership portrait"
        width={1024}
        height={600}
      />
      <Button
        variant="cover"
        className="video-play"
        disabled={!providerId}
        onClick={() => setPlaying(true)}
      >
        <Play />
        {providerId ? "Play conversation" : "Video coming soon"}
      </Button>
    </div>
  );
}
