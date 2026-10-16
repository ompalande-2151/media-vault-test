import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIssues } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
import { IssueCover } from "@/components/magazine/issue-cover";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata(
  "The magazine & issue archive",
  "Explore MediaVault Global magazine collections and the people shaping India’s next chapter.",
);

export default function MagazineIndexPage() {
  const issues = getIssues();
  const current = issues[0];
  if (!current) return null;

  return (
    <div className="site-container pb-14">
      <div className="page-heading">
        <span className="eyebrow">A collection of perspectives</span>
        <h1>The Magazine</h1>
        <p>Issues, cover stories and the archive.</p>
      </div>
      <div className="issue-layout">
        <IssueCover issue={current} />
        <div>
          <span className="eyebrow">
            Current issue · {current.month} {current.year} · Preview
          </span>
          <h2 className="font-editorial text-5xl my-5">{current.theme}</h2>
          <p className="text-muted-foreground leading-7 text-sm mb-7">
            Explore our illustrated preview collection of leadership, enterprise and founder
            perspectives.
          </p>
          <Button size="lg" asChild>
            <Link href={`/magazine/${current.slug}`}>
              Explore the Issue
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>2026 Archive</h2>
        </div>
        <div className="archive-grid">
          {issues.map((i) => (
            <Link key={i.slug} href={`/magazine/${i.slug}`}>
              <IssueCover issue={i} />
              <p className="eyebrow mt-4">
                {i.month} {i.year}
              </p>
              <h3 className="font-editorial text-2xl mt-2">{i.theme}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
