import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthor, getAuthors, getArticles } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getAuthorProfileJsonLd, getBreadcrumbJsonLd, safeJsonLd } from "@/lib/structured-data";
import { StoryCard } from "@/components/magazine/story-card";

export async function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) {
    return createNotFoundMetadata("Author Unavailable");
  }
  return createMetadata({
    title: `${author.name} — Contributor Profile`,
    description: author.bio,
    canonicalPath: `/authors/${author.slug}`,
    ogType: "website",
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();

  const authorArticles = getArticles().filter((x) => x.author === a.slug);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contributors", path: "/about/team" },
    { name: a.name, path: `/authors/${a.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getAuthorProfileJsonLd(a)),
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
          <span className="eyebrow">Our contributors</span>
          <h1>{a.name}</h1>
          <p>{a.bio}</p>
        </div>
        <div className="story-grid">
          {authorArticles.map((x) => (
            <StoryCard key={x.slug} article={x} />
          ))}
        </div>
      </div>
    </>
  );
}
