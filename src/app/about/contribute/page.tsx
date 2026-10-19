import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  FileText,
  Send,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { AboutNav } from "@/components/magazine/about-nav";
import { Newsletter } from "@/components/magazine/newsletter";

export const metadata: Metadata = createMetadata({
  title: "Write for MediaVault Global",
  description:
    "Contribute expert perspectives, founder insights, and operational analysis to MediaVault Global.",
  canonicalPath: "/about/contribute",
  ogType: "website",
});

const GUIDELINES = [
  {
    step: "01",
    title: "100-Word Pitch",
    desc: "Summarise the central hypothesis or practical takeaway. What business dynamic or operational lesson does your piece reveal?",
  },
  {
    step: "02",
    title: "Credentials & Context",
    desc: "State your current executive or professional role, sector authority, and direct experience with the subject matter.",
  },
  {
    step: "03",
    title: "Previous Writing Samples",
    desc: "Provide 1–2 links to published articles, whitepapers, or analytical threads demonstrating your perspective.",
  },
  {
    step: "04",
    title: "Rigorous Fact-Checking",
    desc: "Every data point, statistic, and corporate citation must have a verifiable primary source.",
  },
];

export default function ContributePage() {
  return (
    <>
      <div className="site-container">
        <div className="page-heading text-center">
          <span className="eyebrow">Careers & Expert Contributors</span>
          <h1>Contribute to the Magazine</h1>
          <p className="mx-auto">
            We welcome expert contributors: owners, CXOs, founders, economists and practitioners.
            Share a pitch of 100 words, your credentials and a link to previous writing.
            Contributions are edited, fact-checked and labelled as opinion where appropriate. We do
            not publish paid-for pieces as editorial.
          </p>
        </div>

        <AboutNav />

        <div className="max-w-4xl mx-auto space-y-12 pb-12">
          {/* Pitch Submission Guidelines */}
          <section>
            <div className="mb-6">
              <span className="eyebrow">Submission Protocol</span>
              <h2 className="text-2xl font-serif mt-1">What to Include in Your Pitch</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GUIDELINES.map((g) => (
                <div
                  key={g.step}
                  className="p-6 border border-border rounded-[var(--radius)] bg-card space-y-2"
                >
                  <span className="text-xs font-mono font-semibold text-primary">{g.step}</span>
                  <h3 className="font-serif text-lg font-medium">{g.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison: What we accept vs what we decline */}
          <section>
            <div className="mb-6">
              <span className="eyebrow">Editorial Boundaries</span>
              <h2 className="text-2xl font-serif mt-1">Contributor Standards</h2>
            </div>

            <div className="comparison-grid">
              <div className="comparison-box included">
                <h4 className="text-emerald-700 dark:text-emerald-400">What We Publish</h4>
                <ul>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>First-person operational reflections by builders and operators</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Rigorous economic, policy, and manufacturing analysis</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Clearly labelled analytical op-eds with disclosed affiliations</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Contrarian arguments backed by empirical numbers</span>
                  </li>
                </ul>
              </div>

              <div className="comparison-box excluded">
                <h4 className="text-destructive">What We Do Not Accept</h4>
                <ul>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Paid-for promotional pieces disguised as editorial commentary</span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>
                      Ghostwritten corporate PR pieces without authentic practitioner voice
                    </span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>
                      Generic, surface-level commentary synthesized without domain experience
                    </span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Undisclosed brand promotion or affiliate links</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action Pitch Section */}
          <section className="p-8 border border-border rounded-[var(--radius)] bg-card text-center space-y-4">
            <span className="eyebrow">Ready to Pitch?</span>
            <h3 className="font-serif text-3xl">Send Your Proposal to Our Editors</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have your 100-word pitch, credentials, and published links ready. Our editorial desk
              reviews unsolicited pitches on a rolling weekly schedule.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/submit-a-story"
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded bg-primary text-primary-foreground"
              >
                <Send size={16} />
                Submit Pitch Online
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/about/editorial-standards"
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded border border-border hover:bg-muted transition-colors"
              >
                <ShieldCheck size={16} />
                Review Editorial Standards
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
