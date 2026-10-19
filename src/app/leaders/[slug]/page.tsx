import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLeader, getLeaders, getArticle } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getLeaderJsonLd, safeJsonLd } from "@/lib/structured-data";
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
  if (!leader) {
    return createNotFoundMetadata("Leader Unavailable");
  }
  return createMetadata({
    title: `${leader.name} — Leadership Spotlight`,
    description: leader.bio,
    canonicalPath: `/leaders/${leader.slug}`,
    ogType: "website",
    ogImage: leader.image,
  });
}

export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLeader(slug);
  if (!l) notFound();

  const article = getArticle(l.article);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Leadership", path: "/category/leadership" },
    { name: l.name, path: `/leaders/${l.slug}` },
  ];

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
        <Image
          src={l.image}
          alt={`Editorial portrait of ${l.name}, ${l.role} at ${l.company}`}
          width={640}
          height={492}
          priority
          sizes="(max-width: 768px) 100vw, 450px"
          quality={80}
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
          __html: safeJsonLd(getLeaderJsonLd(l)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
    </div>
  );
}
