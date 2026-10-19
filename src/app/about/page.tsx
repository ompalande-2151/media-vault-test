import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Users, Mail, Feather, CheckCircle2 } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Newsletter } from "@/components/magazine/newsletter";
import { AboutNav } from "@/components/magazine/about-nav";

export const metadata: Metadata = createMetadata({
  title: "About MediaVault Global: India-First Business Magazine",
  description:
    "MediaVault Global is an India-first, global-ready business magazine covering enterprise, leadership, MSMEs and founders with verified reporting.",
  canonicalPath: "/about",
  ogType: "website",
});

const COVERAGE_AREAS = [
  {
    title: "Leadership",
    slug: "/category/leadership",
    desc: "Decisions, lessons and the people making them.",
  },
  {
    title: "Enterprise",
    slug: "/category/enterprise",
    desc: "Strategy and operations inside India's industrial corridors.",
  },
  {
    title: "MSME & Growth",
    slug: "/category/msme-growth",
    desc: "Practical playbooks for small businesses that want to scale.",
  },
  {
    title: "Startups & Founders",
    slug: "/category/startups-founders",
    desc: "Early-stage stories and lessons.",
  },
  {
    title: "Industries",
    slug: "/category/industries",
    desc: "Sector outlooks across ten industries.",
  },
  {
    title: "Insights",
    slug: "/category/insights",
    desc: "Analysis, guides, opinion, research and case studies.",
  },
  {
    title: "Video",
    slug: "/video",
    desc: "CEO voices, founder talks and 60-second briefs.",
  },
  {
    title: "Magazine",
    slug: "/magazine",
    desc: "Issues, cover stories and the archive.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="site-container">
        <div className="page-heading text-center">
          <span className="eyebrow">About MediaVault Global</span>
          <h1>A Business Magazine for the People Who Build</h1>
          <p className="mx-auto">
            MediaVault Global covers the businesses that make, move and finance things: factories in
            industrial estates, founders in their first office, CEOs running complex organisations
            and the policies that shape them. We start in India and write for a global reader.
          </p>
        </div>

        <AboutNav />

        <div className="max-w-5xl mx-auto space-y-14 pb-12">
          {/* Core Philosophy */}
          <section className="prose-page max-w-3xl mx-auto text-center">
            <h2>Our Publishing Philosophy</h2>
            <p className="text-lg leading-relaxed text-foreground font-normal">
              We publish practical analysis, profiles and guides. We verify our numbers, label our
              content clearly and keep our design clean enough to read on a phone between meetings.
            </p>
            <div className="publisher-notice text-left">
              <div>
                <strong>Publisher Note:</strong> This site preview displays illustrative sample
                articles, photography, and issues. Verified reporting and final editorial assets are
                populated upon official release.
              </div>
            </div>
          </section>

          {/* What We Cover */}
          <section>
            <div className="text-center mb-8">
              <span className="eyebrow">Editorial Breadth</span>
              <h2 className="text-3xl font-serif mt-1">What We Cover</h2>
              <p className="text-foreground text-sm mt-2 max-w-xl mx-auto font-medium opacity-90">
                Rigorous coverage across the pillars driving economic momentum:
              </p>
            </div>

            <div className="editorial-grid">
              {COVERAGE_AREAS.map((c) => (
                <Link key={c.slug} href={c.slug} className="editorial-card group">
                  <div className="flex items-center justify-between">
                    <h3>{c.title}</h3>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                  <p className="text-foreground font-normal leading-relaxed">{c.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Explore About Sections */}
          <section className="pt-8 border-t border-border">
            <div className="text-center mb-8">
              <span className="eyebrow">Explore MediaVault</span>
              <h2 className="text-3xl font-serif mt-1">Inside Our Organization</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link href="/about/editorial-standards" className="editorial-card group">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={24} />
                  <h3 className="group-hover:text-primary transition-colors">
                    Mission & Editorial Standards
                  </h3>
                </div>
                <p>
                  How we verify facts, label content transparently, and separate editorial coverage
                  from commercial sponsorships.
                </p>
              </Link>

              <Link href="/about/team" className="editorial-card group">
                <div className="flex items-center gap-3">
                  <Users className="text-primary" size={24} />
                  <h3 className="group-hover:text-primary transition-colors">The Team</h3>
                </div>
                <p>
                  Meet the leadership, editors, correspondents, and producers behind the magazine.
                </p>
              </Link>

              <Link href="/about/contact" className="editorial-card group">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={24} />
                  <h3 className="group-hover:text-primary transition-colors">Talk to the Desk</h3>
                </div>
                <p>
                  Direct lines for story tips, partnerships, advertising enquiries, press, and
                  corrections.
                </p>
              </Link>

              <Link href="/about/contribute" className="editorial-card group">
                <div className="flex items-center gap-3">
                  <Feather className="text-primary" size={24} />
                  <h3 className="group-hover:text-primary transition-colors">
                    Write for MediaVault Global
                  </h3>
                </div>
                <p>
                  We welcome expert contributors, CXOs, economists, and founders to share actionable
                  industry insight.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
