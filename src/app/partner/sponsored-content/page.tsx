import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldAlert, ArrowUpRight, FileEdit, Sparkles } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PartnerNav } from "@/components/magazine/partner-nav";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata({
  title: "Sponsored and Partner Content | MediaVault Global",
  description:
    "Transparent, clearly labelled brand storytelling and sponsored content co-created with MediaVault Global.",
  canonicalPath: "/partner/sponsored-content",
  ogType: "website",
});

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Briefing",
    desc: "We align with your corporate communications or marketing team on the narrative, case study, or industry milestone to highlight.",
  },
  {
    step: "02",
    title: "Drafting & Verification",
    desc: "Our commercial writers craft a clean, high-context business story, fact-checking cited metrics and data claims.",
  },
  {
    step: "03",
    title: "Client Review & Polish",
    desc: "You receive one comprehensive round of edits to ensure brand positioning and technical accuracy are spot on.",
  },
  {
    step: "04",
    title: "Labelled Publishing & Distribution",
    desc: "Published with transparent 'Partner Feature' attribution, search engine optimization, and newsletter/social distribution.",
  },
];

export default function SponsoredContentPage() {
  return (
    <div className="site-container">
      <div className="page-heading text-center">
        <span className="eyebrow">Brand Narratives</span>
        <h1>Your Story, Clearly Labelled</h1>
        <p className="mx-auto">
          We write or co-create content for brands. Each piece carries a Sponsored or Partner label.
          We fact-check claims and may decline material that is misleading. Partner content is
          separate from our editorial coverage and does not imply editorial endorsement.
        </p>
      </div>

      <PartnerNav />

      <div className="form-layout">
        <div className="space-y-10">
          {/* Deliverables Comparison */}
          <section>
            <span className="eyebrow">Deliverables Scope</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">What the Engagement Covers</h2>

            <div className="comparison-grid">
              <div className="comparison-box included">
                <h4 className="text-emerald-700 dark:text-emerald-400">Includes</h4>
                <ul>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Editorial brief alignment session</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Professional draft written for an executive readership</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>One comprehensive round of copy revisions</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete SEO and metadata optimization</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Promotion across our distribution channels</span>
                  </li>
                </ul>
              </div>

              <div className="comparison-box excluded">
                <h4 className="text-destructive">Does Not Include</h4>
                <ul>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Guaranteed independent editorial coverage</span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Guaranteed search engine or directory rankings</span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Guaranteed sales leads or transactional results</span>
                  </li>
                  <li>
                    <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <span>Implied editorial endorsement or award status</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section>
            <span className="eyebrow">Step-by-Step Workflow</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">How Campaigns Unfold</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROCESS_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="p-4 border border-border rounded-[var(--radius)] bg-card space-y-1.5"
                >
                  <span className="text-xs font-mono font-semibold text-primary">{s.step}</span>
                  <h3 className="font-serif text-base font-medium">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Standards Note */}
          <div className="publisher-notice">
            <ShieldAlert size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Editorial Fact-Check Policy:</strong> Brand partners supply verifiable sources
              for corporate metrics (such as customer count, revenue growth, or investment capital).
              Material that cannot be substantiated will be excluded from the published copy.
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
          <div className="mb-6">
            <span className="eyebrow">Inquire About Sponsored Features</span>
            <h2 className="text-2xl font-serif mt-1">Book a Brand Story</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Submit your objectives and campaign timeline. Our partnerships team will respond with
              scheduling options and editorial availability.
            </p>
          </div>
          <EnquiryForm kind="partner" />
        </div>
      </div>
    </div>
  );
}
