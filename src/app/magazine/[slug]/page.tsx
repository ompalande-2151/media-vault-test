import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIssue, getIssues, getArticle } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getPublicationIssueJsonLd, safeJsonLd } from "@/lib/structured-data";
import { IssueCover } from "@/components/magazine/issue-cover";
import { StoryCard } from "@/components/magazine/story-card";

export async function generateStaticParams() {
  return getIssues().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) {
    return createNotFoundMetadata("Issue Unavailable");
  }
  return createMetadata({
    title: `${issue.month} ${issue.year}: ${issue.title} | The Magazine`,
    description: issue.theme,
    canonicalPath: `/magazine/${issue.slug}`,
    ogType: "website",
    ogImage: issue.image,
  });
}

export default async function MagazineIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIssue(slug);
  if (!i) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "The Magazine", path: "/magazine" },
    { name: `${i.month} ${i.year}`, path: `/magazine/${i.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getPublicationIssueJsonLd(i)),
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
          <span className="eyebrow">
            {i.month} {i.year} · Preview issue
          </span>
          <h1>{i.theme}</h1>
          <p>Meet the ideas and perspectives at the heart of this month’s edition.</p>
        </div>
        <div className="issue-layout">
          <IssueCover issue={i} />
          <div>
            <span className="eyebrow">Inside the issue</span>
            <h2 className="font-editorial text-4xl my-4">{i.title}</h2>
            <p className="text-sm text-muted-foreground leading-7">
              Read the featured stories online below. This preview issue is an illustrative
              collection; no downloadable publication is available.
            </p>
          </div>
        </div>
        <div className="section-heading">
          <h2>Contents</h2>
        </div>
        <div className="story-grid">
          {i.stories.map((s) => {
            const a = getArticle(s);
            return a ? <StoryCard article={a} key={s} showSummary /> : null;
          })}
        </div>
      </div>
    </>
  );
}
