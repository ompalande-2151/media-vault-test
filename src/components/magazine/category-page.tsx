"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StoryCard } from "./story-card";
import { Newsletter } from "./newsletter";
import { getArticles, subSlug } from "@/lib/queries";
import type { Category } from "@/lib/types";

export function CategoryPage({ category, selected }: { category: Category; selected?: string }) {
  const [limit, setLimit] = useState(6);
  const stories = getArticles(category.slug, selected);

  return (
    <>
      <div className="site-container">
        <div className="page-heading">
          <span className="eyebrow">Explore MediaVault</span>
          <h1>{selected || category.name}</h1>
          <p>{category.intro}</p>
        </div>
        <div className="filter-bar">
          <Button variant={!selected ? "default" : "editorial"} asChild>
            <Link href={`/category/${category.slug}`}>All stories</Link>
          </Button>
          {category.subs.map((sub) => (
            <Button key={sub} variant={selected === sub ? "default" : "editorial"} asChild>
              <Link href={`/category/${category.slug}/${subSlug(sub)}`}>{sub}</Link>
            </Button>
          ))}
        </div>
        {stories.length ? (
          <div className="story-grid mb-12">
            {stories.slice(0, limit).map((a) => (
              <StoryCard key={a.slug} article={a} showSummary />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="font-editorial text-3xl">A new perspective is on its way.</h2>
            <p className="text-muted-foreground text-sm mt-3">
              Explore more stories from {category.name}.
            </p>
            <Button variant="editorial" className="mt-6" asChild>
              <Link href={`/category/${category.slug}`}>View all {category.name}</Link>
            </Button>
          </div>
        )}
        {limit < stories.length && (
          <div className="text-center mb-12">
            <Button variant="editorial" onClick={() => setLimit((n) => n + 6)}>
              Load more stories
            </Button>
          </div>
        )}
      </div>
      <Newsletter />
    </>
  );
}
