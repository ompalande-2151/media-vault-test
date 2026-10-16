import type { Metadata } from "next";
import { Layout, BookmarkCheck, Mail, Video, AlertCircle, FileText } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PartnerNav } from "@/components/magazine/partner-nav";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata(
  "Advertise With MediaVault Global",
  "High-impact display banners, section sponsorships, newsletter sponsorships, and video pre-rolls.",
);

const AD_CHANNELS = [
  {
    icon: Layout,
    title: "Homepage Hero & Billboard Banner",
    placement: "Top-of-fold placement",
    desc: "Premium, uncluttered banner real estate greeting enterprise executives, founders, and investors visiting our homepage daily.",
    specs: "Desktop: 1200x250 or 970x250 | Mobile: 320x100 or 300x250 | HTML5, static JPG/PNG",
  },
  {
    icon: BookmarkCheck,
    title: "Editorial Section Sponsorship",
    placement: "Exclusive category branding",
    desc: "Anchor your brand next to deep reporting in Leadership, Enterprise, MSME & Growth, Startups & Founders, or Industries.",
    specs: "Co-branded category masthead banner + contextual mid-article card placements",
  },
  {
    icon: Mail,
    title: "The MediaVault Brief (Newsletter)",
    placement: "Direct inbox delivery",
    desc: "Dedicated primary sponsor block and footer shoutout reaching decision-makers in their morning reading routine.",
    specs: "Logo (600x150) + 70 words of sponsor copy + trackable CTA link",
  },
  {
    icon: Video,
    title: "CEO Voice Video Pre-Roll",
    placement: "Multimedia executive series",
    desc: "15-second sponsor bumper or integrated presenter credit on our flagship CEO and founder video conversations.",
    specs: "1080p MP4 | 16:9 | High-fidelity audio | Brand title card",
  },
];

export default function AdvertisePage() {
  return (
    <div className="site-container">
      <div className="page-heading text-center">
        <span className="eyebrow">Advertising Placements & Sponsorships</span>
        <h1>Display, Newsletter and Video Placements</h1>
        <p className="mx-auto">
          Position your organization in front of India’s economic builders. Options:
          homepage banner, section sponsorship, newsletter sponsorship, pre-roll on video.
          Media kit available on request. Ads are labelled and separated from editorial content.
        </p>
      </div>

      <PartnerNav />

      <div className="form-layout">
        <div className="space-y-10">
          {/* Confirmation Notice */}
          <div className="publisher-notice">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Rate Card Notice:</strong> [FOUNDER TO CONFIRM rates and verified audience
              figures.] Rate cards, circulation benchmarks, and ad inventory schedules are
              provided upon direct request to verified agency or corporate partners.
            </div>
          </div>

          {/* Ad Channels */}
          <div>
            <span className="eyebrow">Available Units</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">Placements & Specifications</h2>

            <div className="space-y-4">
              {AD_CHANNELS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 border border-border rounded-[var(--radius)] bg-card space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Icon size={18} className="text-primary" />
                        <h3 className="font-serif text-lg font-medium">{item.title}</h3>
                      </div>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded bg-muted text-foreground">
                        {item.placement}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
                      <span className="font-semibold text-foreground">Specifications: </span>
                      {item.specs}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border border-border rounded-[var(--radius)] bg-card space-y-3">
            <h3 className="font-serif text-lg font-medium">Standards of Separation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In accordance with MediaVault Global guidelines, all advertisements are
              unambiguously designated as “Advertisement” or “Sponsored”. Creative assets that mimic
              newsroom editorial layout or contain unsubstantiated claims will not be accepted.
            </p>
          </div>
        </div>

        {/* Right Form: Request Media Kit */}
        <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
          <div className="mb-6">
            <span className="eyebrow">Download Information</span>
            <h2 className="text-2xl font-serif mt-1">Request Our Media Kit</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select “Request media kit” or “Advertising” to receive our complete rate card,
              distribution specs, and campaign packaging.
            </p>
          </div>
          <EnquiryForm kind="partner" />
        </div>
      </div>
    </div>
  );
}
