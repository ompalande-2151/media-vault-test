import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getArticle, getArticles, getCategory, getAuthor, subSlug } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata, getArticleCanonicalPath } from "@/lib/seo";
import { getArticleJsonLd, getBreadcrumbJsonLd, safeJsonLd } from "@/lib/structured-data";
import { StoryCard } from "@/components/magazine/story-card";
import { Newsletter } from "@/components/magazine/newsletter";
import { ShareButton } from "./share-button";

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return createNotFoundMetadata("Story Unavailable");
  }

  const author = getAuthor(article.author);
  const category = getCategory(article.category);

  return createMetadata({
    title: article.seoTitle || article.title || article.headline,
    description:
      article.seoDescription ||
      article.metaDescription ||
      article.standfirst ||
      article.excerpt ||
      article.summary,
    canonicalPath: getArticleCanonicalPath(article),
    ogType: "article",
    ogImage: {
      url: article.image,
      alt: article.alt || article.headline,
      width: 1200,
      height: 630,
    },
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: author ? [author.name] : ["MediaVault Global Editorial Desk"],
    section: category?.name || article.category,
    tags: article.tags,
    keywords: article.keywords || article.tags,
    noIndex: article.noIndex || article.status !== "published",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const category = getCategory(a.category);
  const author = getAuthor(a.author);
  const quoteText = a.pullQuote
    ? a.pullQuote.replace(/^["“]|["”]$/g, "")
    : "Lasting progress begins with better questions — and the people willing to ask them.";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category?.name || a.category, path: `/category/${a.category}` },
    ...(a.subcategory
      ? [
          {
            name: a.subcategory,
            path: `/category/${a.category}/${subSlug(a.subcategory)}`,
          },
        ]
      : []),
    { name: a.headline, path: getArticleCanonicalPath(a) },
  ];

  return (
    <>
      <article className="site-container">
        <div className="reading-header">
          <nav className="text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/category/${a.category}`} className="hover:underline">
                  {category?.name}
                </Link>
              </li>
              {a.subcategory && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href={`/category/${a.category}/${subSlug(a.subcategory)}`}
                      className="hover:underline"
                    >
                      {a.subcategory}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <span className="eyebrow">
            {a.series ? `${a.series} · ` : ""}
            {category?.name} · {a.disclosure}
          </span>
          <h1>{a.headline}</h1>
          <p className="summary">{a.standfirst || a.summary}</p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="story-meta">
              <Link href={`/authors/${a.author}`}>By {author?.name}</Link>
            </div>
            <ShareButton />
          </div>
        </div>
        <img
          src={a.image}
          alt={a.alt}
          className="article-hero"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <p className="article-caption">
          {a.alt} · {a.disclosure} preview.
        </p>
        <div className="reading-layout">
          <aside className="reading-toc">
            <span className="eyebrow">In this story</span>
            {a.body.map((block, i) => (
              <a key={block.title} href={`#section-${i}`}>
                {block.title}
              </a>
            ))}
            <div className="mt-8 border-t border-border pt-5">
              <span className="eyebrow">Topics</span>
              <p className="mt-2 text-muted-foreground">{a.tags.join(" · ")}</p>
            </div>
          </aside>
          <div className="reading-body">
            {a.body.map((block, i) => (
              <section key={block.title} id={`section-${i}`}>
                <h2>{block.title}</h2>
                {block.text.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="mb-4">
                    {para}
                  </p>
                ))}
                {i === 1 && <blockquote>“{quoteText}”</blockquote>}
              </section>
            ))}
            {a.factBox && (
              <div className="border border-border p-6 rounded bg-muted/20 my-8">
                <span className="eyebrow">Fact Box</span>
                <p className="mt-2 text-sm text-muted-foreground">{a.factBox}</p>
              </div>
            )}
            {a.sourceNotes && a.sourceNotes.length > 0 && (
              <div className="border-t border-border mt-8 pt-4 text-xs text-muted-foreground">
                <span className="eyebrow">Source Notes</span>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {a.sourceNotes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border-t border-border mt-10 pt-6">
              <span className="eyebrow">About the author</span>
              <h2>{author?.name}</h2>
              <p>{author?.bio}</p>
              <Link className="text-link" href={`/authors/${a.author}`}>
                More from the Editorial Desk
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(getArticleJsonLd(a, author, category)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
          }}
        />
      </article>
      <section className="site-container section">
        <div className="section-heading">
          <h2>The conversation continues</h2>
        </div>
        <div className="story-grid">
          {getArticles()
            .filter((x) => x.slug !== a.slug)
            .slice(0, 3)
            .map((x) => (
              <StoryCard key={x.slug} article={x} />
            ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
