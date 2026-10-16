import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Megaphone, FileCode, Video, Mail, Award, AlertCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PartnerNav } from "@/components/magazine/partner-nav";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata(
  "Partner With MediaVault Global",
  "Reach India's business decision-makers through clearly labelled partner content, events, video and advertising with MediaVault Global.",
);

const FORMATS = [
  {
    icon: FileCode,
    title: "Sponsored & Partner Content",
    slug: "/partner/sponsored-content",
    desc: "Co-created, rigorously fact-checked brand storytelling labelled clearly with full editorial separation.",
  },
  {
    icon: Megaphone,
    title: "Display & Section Advertising",
    slug: "/partner/advertise",
    desc: "High-impact homepage banners, sector sponsorships, and contextual placements across our desktop and mobile editions.",
  },
  {
    icon: Video,
    title: "CEO Voice & Video Series",
    slug: "/partner/advertise",
    desc: "Pre-roll placements and executive video sponsorship alongside thoughtful leadership discussions.",
  },
  {
    icon: Mail,
    title: "Newsletter Placements",
    slug: "/partner/advertise",
    desc: "Direct delivery into the inboxes of founders, corporate leaders, investors, and policymakers.",
  },
  {
    icon: Award,
    title: "Awards & Recognition Programmes",
    slug: "/partner/awards-events",
    desc: "Transparently governed industry recognition with independent juries and open selection criteria.",
  },
  {
    icon: ArrowUpRight,
    title: "Press Releases Desk",
    slug: "/partner/press-releases",
    desc: "Official company announcements published in our labelled press release stream for the business community.",
  },
];

export default function PartnerOverviewPage() {
  return (
    <div className="site-container">
      <div className="page-heading text-center">
        <span className="eyebrow">Commercial Alliances & Sponsorships</span>
        <h1>Reach the People Who Run Indian Business</h1>
        <p className="mx-auto">
          Our readers are owners, CXOs, founders and policymakers. Work with us through
          clearly labelled formats that respect them. Audience figures shown are verified only.
        </p>
      </div>

      <PartnerNav />

      <div className="form-layout">
        {/* Left Column: Formats & Transparency Principles */}
        <div className="space-y-8">
          <div className="publisher-notice">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Audience Notice:</strong> [FOUNDER TO CONFIRM analytics] Verified reader
              metrics and audited reach data will be shared with the official media kit upon general
              launch. MediaVault Global makes zero unverified traffic claims.
            </div>
          </div>

          <div>
            <span className="eyebrow">Partnership Formats</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">How You Can Work With Us</h2>
            <div className="space-y-4">
              {FORMATS.map((f) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.title}
                    href={f.slug}
                    className="p-5 border border-border rounded-[var(--radius)] bg-card block hover:border-primary transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-primary" />
                        <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
                          {f.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">{f.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-6 border border-border rounded-[var(--radius)] bg-muted/40 space-y-3">
            <h3 className="font-serif text-lg font-medium">Our Commercial Separation Guarantee</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every piece of partner content carries clear identification. We fact-check claims
              and protect reader trust above all commercial arrangements.
            </p>
          </div>
        </div>

        {/* Right Column: Enquiry Form */}
        <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
          <div className="mb-6">
            <span className="eyebrow">Initiate Collaboration</span>
            <h2 className="text-2xl font-serif mt-1">Start a Conversation</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Connect with our partnerships team to discuss campaigns, media kit requests, or custom
              formats.
            </p>
          </div>
          <EnquiryForm kind="partner" />
        </div>
      </div>
    </div>
  );
}
