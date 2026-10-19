import type { Metadata } from "next";
import { Award, Users, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PartnerNav } from "@/components/magazine/partner-nav";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata({
  title: "MediaVault Global Awards and Events",
  description:
    "Industry recognition programmes, roundtables, and executive leadership convenings with strict governance.",
  canonicalPath: "/partner/awards-events",
  ogType: "website",
});

const EVENT_PILLARS = [
  {
    icon: Scale,
    title: "Transparent Selection Criteria",
    desc: "Every category has clear, objective qualification standards established in advance and available publicly.",
  },
  {
    icon: Users,
    title: "Independent Jury Evaluation",
    desc: "Submissions and nominations are evaluated by seasoned industry veterans, academics, and former founders.",
  },
  {
    icon: Award,
    title: "Clear 'Award' Content Labelling",
    desc: "All event coverage, nominee profiles, and winner publications are labelled Award so readers can distinguish them immediately.",
  },
  {
    icon: ShieldCheck,
    title: "Open Fee Disclosure & No Pay-to-Win",
    desc: "Nomination fees, if any, are stated openly. We never sell awards in a way that suggests independent editorial endorsement.",
  },
];

export default function AwardsEventsPage() {
  return (
    <div className="site-container">
      <div className="page-heading text-center">
        <span className="eyebrow">Industry Gatherings & Honours</span>
        <h1>Recognise and Convene</h1>
        <p className="mx-auto">
          We plan recognition programmes and roundtables for industry leaders. Award-related content
          is labelled Award. Selection criteria, jury and any fee are published openly. We do not
          sell awards in a way that suggests independent editorial endorsement.
        </p>
      </div>

      <PartnerNav />

      <div className="form-layout">
        <div className="space-y-10">
          {/* Confirmation Notice */}
          <div className="publisher-notice">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Programme Status:</strong> [FOUNDER TO CONFIRM programme details before
              announcing.] The calendar for upcoming business roundtables, manufacturing summits,
              and founder awards is in final planning. Official dates and jury rosters will be
              disclosed upon launch.
            </div>
          </div>

          {/* Pillars */}
          <div>
            <span className="eyebrow">Governance Framework</span>
            <h2 className="text-2xl font-serif mt-1 mb-4">Our Ethical Principles for Awards</h2>

            <div className="space-y-4">
              {EVENT_PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-5 border border-border rounded-[var(--radius)] bg-card space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={18} className="text-primary" />
                      <h3 className="font-serif text-lg font-medium">{p.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border border-border rounded-[var(--radius)] bg-card space-y-3">
            <h3 className="font-serif text-lg font-medium">Executive Roundtables</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In addition to formal awards, MediaVault Global convenes intimate, Chatham House Rule
              discussions among CEOs, policymakers, and scale-up founders tackling urgent sector
              challenges.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
          <div className="mb-6">
            <span className="eyebrow">Sponsorship & Participation</span>
            <h2 className="text-2xl font-serif mt-1">Convene With Us</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Interested in co-hosting an industry roundtable or inquiring about upcoming awards
              cycles? Contact our events desk.
            </p>
          </div>
          <EnquiryForm kind="partner" />
        </div>
      </div>
    </div>
  );
}
