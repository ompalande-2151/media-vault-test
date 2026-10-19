import type { Metadata } from "next";
import Link from "next/link";
import { CheckSquare, ArrowUpRight, AlertCircle, FileText, Image, Link2, User } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PartnerNav } from "@/components/magazine/partner-nav";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata({
  title: "Submit a Press Release | MediaVault Global",
  description:
    "Submit official announcements and corporate developments to the MediaVault Global press releases stream.",
  canonicalPath: "/partner/press-releases",
  ogType: "website",
});

const CHECKLIST = [
  {
    icon: FileText,
    item: "Clear, factual headline",
    detail:
      "State the core announcement objectively without excessive hyperbole or promotional buzzwords.",
  },
  {
    icon: CheckSquare,
    item: "300–500 words of copy",
    detail:
      "Concise announcement including date, location, key quote, and essential background details.",
  },
  {
    icon: User,
    item: "Verified media contact",
    detail: "Name, official corporate email, and telephone number for journalistic verification.",
  },
  {
    icon: Image,
    item: "High-resolution corporate imagery",
    detail:
      "Minimum 1200px width. Product photography, executive headshot, or official corporate logo.",
  },
  {
    icon: Link2,
    item: "Primary source links",
    detail: "Links to the official regulatory filing, product portal, or corporate newsroom page.",
  },
];

export default function PressReleasesPage() {
  return (
    <div className="site-container">
      <div className="page-heading text-center">
        <span className="eyebrow">Corporate News Wire</span>
        <h1>Share Company News</h1>
        <p className="mx-auto">
          Submit announcements for the Press Release section. Releases are labelled, published as
          supplied after a basic check and are not editorial coverage. Our editors may separately
          choose to cover a news item; we do not promise it.
        </p>
      </div>

      <PartnerNav />

      <div className="form-layout">
        <div className="space-y-10">
          {/* Submission Checklist */}
          <div>
            <span className="eyebrow">Prerequisites</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">Submission Checklist</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Before submitting your press release, verify that your release packet meets our five
              mandatory requirements:
            </p>

            <ul className="checklist-list">
              {CHECKLIST.map((c) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.item}
                    className="p-4 border border-border rounded-[var(--radius)] bg-card"
                  >
                    <div className="w-8 h-8 rounded bg-accent text-primary flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{c.item}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {c.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Independence disclosure */}
          <div className="publisher-notice">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Distinct From News Reporting:</strong> Press releases are published under the
              “Press Release” category tag with raw corporate attribution. Submission does not imply
              reporting endorsement, nor does it guarantee follow-up articles by our staff
              correspondents.
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
          <div className="mb-6">
            <span className="eyebrow">Transmission Desk</span>
            <h2 className="text-2xl font-serif mt-1">Submit Your Announcement</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Include your draft text, release timing, and supporting assets. Our distribution desk
              will review and acknowledge your submission.
            </p>
          </div>
          <EnquiryForm kind="partner" />
        </div>
      </div>
    </div>
  );
}
