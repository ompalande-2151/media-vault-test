import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Building2, TrendingUp, Lightbulb, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/magazine/story-card";
import { Newsletter } from "@/components/magazine/newsletter";
import { IssueCover } from "@/components/magazine/issue-cover";
import { PartnerBand } from "@/components/magazine/site-shell";
import { HeroCoverStory } from "@/components/magazine/hero-cover-story";
import {
  getArticles,
  getIssues,
  getLeaders,
  getVideos,
  getHeroFeaturedArticles,
  getBriefArticles,
  getCategoryLabel,
} from "@/lib/queries";
import { createMetadata, getArticleCanonicalPath } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "MediaVault Global | Business, leadership & what comes next",
  description:
    "The people, ideas and businesses shaping what comes next — from India to the world. Explore MediaVault Global.",
  canonicalPath: "/",
  ogType: "website",
});

export default function HomePage() {
  const articles = getArticles();
  const heroFeatured = getHeroFeaturedArticles();
  const briefArticles = getBriefArticles(3);
  const leader = getLeaders()[0];
  const issue = getIssues()[0];
  const video = getVideos()[0];

  if (!heroFeatured.length || !leader || !issue || !video) return null;

  return (
    <>
      <div className="site-container">
        <div className="edition-line">
          <span>
            <strong>India Is Being Built Here.</strong>
          </span>
          <span className="flex items-center gap-2">
            <span className="dot" /> Enterprise, leadership and founder stories from the corridors,
            plants and offices driving India's economy.
          </span>
        </div>
        <div className="cover-grid">
          <HeroCoverStory items={heroFeatured} />
          <aside className="brief">
            <div className="flex items-center justify-between">
              <h2 className="brief-title w-full">The Brief</h2>
            </div>
            {briefArticles.map((a) => (
              <article className="brief-story" key={a.slug}>
                <span className="eyebrow">{getCategoryLabel(a.category)}</span>
                <h3>
                  <Link href={getArticleCanonicalPath(a)}>{a.headline}</Link>
                </h3>
              </article>
            ))}
            <Link href="/search" className="brief-bottom">
              More perspectives
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
        <section className="section">
          <div className="section-heading">
            <h2>Editor’s Picks</h2>
            <Link href="/search" className="text-link">
              Explore all stories
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="story-grid">
            {articles.slice(1, 4).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <section className="section">
          <div className="section-heading">
            <h2>Your business. Your next chapter.</h2>
          </div>
          <div className="pathways">
            {[
              {
                name: "Enterprise",
                slug: "enterprise",
                text: "Strategy, transformation and the ideas moving big business forward.",
                Icon: Building2,
              },
              {
                name: "MSME & Growth",
                slug: "msme-growth",
                text: "Practical playbooks for stronger teams, smarter operations and lasting growth.",
                Icon: TrendingUp,
              },
              {
                name: "Startups & Founders",
                slug: "startups-founders",
                text: "Bold beginnings, founder journeys and the road from ambition to impact.",
                Icon: Lightbulb,
              },
            ].map((p) => (
              <div className="pathway" key={p.slug}>
                <p.Icon size={22} className="text-primary" />
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <Link href={`/category/${p.slug}`} className="text-link">
                  Explore {p.name}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="spotlight-band">
        <div className="site-container">
          <div className="section-heading">
            <h2>Leadership Spotlight</h2>
            <Link href="/category/leadership" className="text-link">
              Meet the leaders
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="spotlight">
            <Link href={`/leaders/${leader.slug}`}>
              <Image
                src={leader.image}
                alt="Illustrative portrait of fictional founder Ananya Rao"
                width={640}
                height={492}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 450px"
                quality={80}
              />
            </Link>
            <div>
              <span className="eyebrow">Women who lead · Editorial perspective</span>
              <h3>
                “The best way to build the future is to invest in the people who will shape it.”
              </h3>
              <p>
                Ananya Rao · Founder & CEO, Arbor Technologies
                <br />A sample perspective on leadership, purpose and building for the long term.
              </p>
              <Button variant="editorial" asChild>
                <Link href={`/leaders/${leader.slug}`}>
                  Read the Conversation
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="site-container">
        <section className="section">
          <div className="section-heading">
            <h2>Industry Focus</h2>
            <Link className="text-link" href="/category/industries">
              Across the sectors
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="story-grid">
            {articles
              .filter((a) => a.category === "industries")
              .slice(0, 3)
              .map((a) => (
                <StoryCard key={a.slug} article={a} showSummary />
              ))}
          </div>
        </section>
        <section className="section">
          <div className="section-heading">
            <h2>The Growth Desk</h2>
            <Link className="text-link" href="/category/msme-growth">
              Build smarter
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="story-grid">
            {articles
              .filter((a) => a.category === "msme-growth")
              .slice(0, 3)
              .map((a) => (
                <StoryCard key={a.slug} article={a} showSummary />
              ))}
          </div>
        </section>
      </div>
      <section className="dark-band">
        <div className="site-container">
          <div className="section-heading">
            <h2>CEO Voice</h2>
            <Link href="/video" className="text-link">
              All conversations
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="video-grid">
            <Link href={`/video/${video.slug}`} className="video-poster">
              <Image
                src={video.image}
                alt="Illustrative CEO Voice portrait"
                width={800}
                height={470}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={80}
              />
              <Button asChild variant="cover" className="video-play">
                <span>
                  <Play size={15} /> Explore the conversation
                </span>
              </Button>
            </Link>
            <div>
              <span className="eyebrow">A different kind of conversation</span>
              <h3>{video.title}</h3>
              <p>{video.summary}</p>
              <Link href={`/video/${video.slug}`} className="text-link mt-6">
                Read the conversation
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="site-container section">
        <div className="section-heading">
          <h2>The Magazine</h2>
          <Link href="/magazine" className="text-link">
            Explore the archive
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="issue-layout">
          <Link href={`/magazine/${issue.slug}`}>
            <IssueCover issue={issue} />
          </Link>
          <div>
            <span className="eyebrow">Preview edition</span>
            <h3 className="font-editorial text-4xl mt-4 mb-5">{issue.theme}</h3>
            <p className="text-sm text-muted-foreground leading-7 max-w-lg mb-6">
              A closer look at the people, industries and ideas writing India’s next chapter.
              Explore this month’s collection of perspectives.
            </p>
            <Button variant="editorial" size="lg" asChild>
              <Link href={`/magazine/${issue.slug}`}>
                Explore the Issue
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Newsletter />
      <PartnerBand />
    </>
  );
}
