"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroStoryItem } from "@/lib/queries";
import { getArticleCanonicalPath } from "@/lib/seo";

interface HeroCoverStoryProps {
  items: HeroStoryItem[];
  intervalMs?: number;
}

export function HeroCoverStory({ items, intervalMs = 5000 }: HeroCoverStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Auto-rotation timer that never pauses on hover
  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex] || items[0];
  const targetHref = getArticleCanonicalPath(current.article);

  return (
    <article className="cover-story" aria-label="Featured section cover stories">
      {/* Background Images with smooth crossfade */}
      {items.map((item, idx) => {
        const isActive = idx === activeIndex;
        // Render slide 0 on initial SSR/HTML, and defer remaining slides until after mount
        if (idx !== 0 && !hasMounted) {
          return null;
        }

        return (
          <Image
            key={item.categorySlug}
            src={item.article.image}
            alt={item.article.alt || item.article.headline}
            fill
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1100px"
            quality={80}
            className={`cover-story-bg absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          />
        );
      })}

      {/* Main Cover Copy */}
      <div className="cover-copy w-full">
        <h1 key={`title-${current.categorySlug}`} className="animate-fade-in">
          {current.article.headline}
        </h1>

        <p key={`deck-${current.categorySlug}`} className="deck animate-fade-in">
          {current.article.summary || current.article.excerpt}
        </p>

        <div className="cover-meta">
          <span>
            By{" "}
            {current.article.author === "the-editorial-desk"
              ? "the Editorial Desk"
              : current.article.author}
          </span>
        </div>

        <Button variant="cover" size="lg" asChild>
          <Link href={targetHref}>
            Read the Story
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
