import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeader, getLeaders, getArticle } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
import { StoryCard } from "@/components/magazine/story-card";

export async function generateStaticParams() {
  return getLeaders().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const leader = getLeader(slug);
  if (!leader)
    return createMetadata("Profile unavailable", "Meet leaders and founders on MediaVault Global.");
  return createMetadata(leader.name, leader.bio);
}

export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLeader(slug);
  if (!l) notFound();

  const article = getArticle(l.article);

  return (
    <div className="site-container">
      <div className="page-heading">
        <span className="eyebrow">Leadership spotlight · Illustrative editorial profile</span>
        <h1>{l.name}</h1>
        <p>
          {l.role}, {l.company} · {l.location}
        </p>
      </div>
      <div className="spotlight mb-12">
        <img
          src={l.image}
          alt={`AI-generated portrait of fictional founder ${l.name}`}
          width={1024}
          height={1024}
        />
        <div>
          <span className="eyebrow">People. Purpose. Possibility.</span>
          <h3>Building a future that puts people first.</h3>
          <p>{l.bio}</p>
          <Link href="/category/leadership" className="text-link">
            Explore leadership perspectives →
          </Link>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>In conversation</h2>
        </div>
        <div className="story-grid">{article && <StoryCard article={article} showSummary />}</div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: l.name,
            jobTitle: l.role,
            description: l.bio,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
