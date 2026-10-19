import Link from "next/link";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/queries";
import { getArticleCanonicalPath } from "@/lib/seo";

export function StoryCard({
  article,
  showSummary = false,
}: {
  article: Article;
  showSummary?: boolean;
}) {
  const href = getArticleCanonicalPath(article);
  return (
    <article className="story-card">
      <Link href={href} className="story-image">
        <img src={article.image} alt={article.alt} width={640} height={400} loading="lazy" />
      </Link>
      <span className="eyebrow">{getCategory(article.category)?.name}</span>
      <h3>
        <Link href={href}>{article.headline}</Link>
      </h3>
      {showSummary && <p>{article.summary}</p>}
    </article>
  );
}
