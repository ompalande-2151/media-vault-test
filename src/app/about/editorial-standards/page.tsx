import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Shield, CheckCheck, Tag, Lock, History, AlertCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { AboutNav } from "@/components/magazine/about-nav";
import { Newsletter } from "@/components/magazine/newsletter";

export const metadata: Metadata = createMetadata({
  title: "Our Editorial Standards | MediaVault Global",
  description:
    "How MediaVault Global verifies facts, labels content and separates editorial from sponsored and partner material.",
  canonicalPath: "/about/editorial-standards",
  ogType: "website",
});

const STANDARDS = [
  {
    icon: CheckCheck,
    title: "Verified Data",
    desc: "Every number is sourced. If we cannot source it, we do not state it as fact. We prioritize primary filings, audited statements, direct executive commentary, and verifiable industry databases.",
  },
  {
    icon: Tag,
    title: "Clear Labels",
    desc: "Editorial, sponsored, partner, opinion, press release and award-related content are marked at the top of the page. Readers will always know exactly who created and funded the material they read.",
  },
  {
    icon: Lock,
    title: "Independence",
    desc: "Commercial partners do not control our editorial coverage. Advertising agreements, sponsorships, and event partnerships have zero influence on our reporting, reviews, or story selection.",
  },
  {
    icon: History,
    title: "Open Corrections",
    desc: "Errors are fixed openly with a note and a date. We do not make silent changes to reported facts. If you spot a factual error, report it directly to our desk.",
    note: "Report one at corrections@[domain]. [FOUNDER TO CONFIRM address: corrections@mediavaultglobal.com]",
  },
  {
    icon: Shield,
    title: "No Guaranteed Coverage",
    desc: "We never sell guaranteed editorial placement. Earned media cannot be bought, and commercial partnerships never promise editorial features, interviews, or rankings.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <>
      <div className="site-container">
        <div className="page-heading text-center">
          <span className="eyebrow">Our Mission & Editorial Standards</span>
          <h1>What You Can Expect From Us</h1>
          <p className="mx-auto">
            MediaVault Global is committed to independent, verified reporting that business leaders
            and founders can rely upon. Here is our contract with our readers.
          </p>
        </div>

        <AboutNav />

        <div className="max-w-4xl mx-auto space-y-12 pb-12">
          {/* Main Standards Grid */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {STANDARDS.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="p-6 border border-border rounded-[var(--radius)] bg-card flex flex-col md:flex-row gap-5 items-start"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          Principle 0{index + 1}
                        </span>
                        <h3 className="font-serif text-2xl font-medium">{s.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                      {s.note && (
                        <div className="publisher-notice mt-3 !my-0 text-xs">
                          <AlertCircle size={15} className="text-primary shrink-0 mt-0.5" />
                          <span>{s.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Conflict of interest and disclosures */}
          <section className="prose-page border-t border-border pt-8">
            <h2>Conflicts of Interest & Editorial Separation</h2>
            <p>
              MediaVault Global maintains an impenetrable wall between our commercial operations and
              editorial desk. Correspondents, editors, and fact-checkers do not participate in
              commercial negotiations, nor do commercial personnel determine journalistic focus.
            </p>
            <p>
              When a reporter or contributor has an interest in a company or individual mentioned,
              that interest is disclosed transparently within the article.
            </p>

            <h2>Reporting an Error or Seeking Clarification</h2>
            <p>
              Accuracy is the cornerstone of trust. Readers, subject individuals, and corporate
              representatives who identify a factual inconsistency are invited to notify us
              immediately.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/about/contact"
                className="btn-primary inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded bg-primary text-primary-foreground"
              >
                Contact the Corrections Desk
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/corrections"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded border border-border hover:bg-muted transition-colors"
              >
                View Public Corrections Log
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
