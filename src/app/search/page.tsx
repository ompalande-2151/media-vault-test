"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { getArticles, getCategories } from "@/lib/queries";
import { StoryCard } from "@/components/magazine/story-card";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(6);

  const articles = getArticles();
  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: [
          { name: "headline", weight: 0.4 },
          { name: "tags", weight: 0.2 },
          { name: "summary", weight: 0.15 },
          { name: "body.text", weight: 0.1 },
          { name: "category", weight: 0.1 },
          { name: "author", weight: 0.05 },
        ],
        threshold: 0.35,
      }),
    [articles],
  );

  const results = (q ? fuse.search(q).map((r) => r.item) : articles).filter(
    (a) => !category || a.category === category,
  );

  const handleQueryChange = (val: string) => {
    setLimit(6);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <div className="site-container pb-14">
      <div className="page-heading">
        <span className="eyebrow">Find your next perspective</span>
        <h1>Explore the vault.</h1>
        <div className="flex items-center gap-4 max-w-3xl mt-6">
          <Search size={24} />
          <input
            className="search-input"
            placeholder="Search stories, people, industries…"
            aria-label="Search stories"
            value={q}
            onChange={(e) => handleQueryChange(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-bar">
        <Button
          variant={!category ? "default" : "editorial"}
          onClick={() => {
            setCategory("");
            setLimit(6);
          }}
        >
          All
        </Button>
        {getCategories().map((c) => (
          <Button
            key={c.slug}
            variant={category === c.slug ? "default" : "editorial"}
            onClick={() => {
              setCategory(c.slug);
              setLimit(6);
            }}
          >
            {c.name}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-7">
        {q ? `${results.length} stories for “${q}”` : "Latest stories and perspectives"}
      </p>
      {results.length ? (
        <div className="story-grid">
          {results.slice(0, limit).map((a) => (
            <StoryCard key={a.slug} article={a} showSummary />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h2 className="font-editorial text-4xl">No stories found.</h2>
          <p className="text-muted-foreground text-sm mt-4">Try another topic, name or industry.</p>
        </div>
      )}
      {limit < results.length && (
        <div className="text-center mt-10">
          <Button variant="editorial" onClick={() => setLimit((n) => n + 6)}>
            Load more stories
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="site-container py-20 text-center">
          <p className="text-muted-foreground">Loading search…</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
