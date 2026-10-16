import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthor, getAuthors, getArticles } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
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
  if (!author) return createMetadata("Author unavailable", "MediaVault Global contributors.");
  return createMetadata(author.name, author.bio);
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();

  const authorArticles = getArticles().filter((x) => x.author === a.slug);

  return (
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
  );
}
