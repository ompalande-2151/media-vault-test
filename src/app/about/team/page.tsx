import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, AlertCircle, Briefcase, Mail } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { AboutNav } from "@/components/magazine/about-nav";
import { Newsletter } from "@/components/magazine/newsletter";

export const metadata: Metadata = createMetadata({
  title: "The MediaVault Global Team",
  description: "The journalists, editors, and producers behind MediaVault Global.",
  canonicalPath: "/about/team",
  ogType: "website",
});

const MASTHEAD_ROLES = [
  {
    role: "Founder & Editor-in-Chief",
    department: "Executive Leadership",
    scope:
      "Editorial vision, overall journalistic integrity, governance, and publication strategy.",
  },
  {
    role: "Managing Editor",
    department: "Newsroom Management",
    scope:
      "Day-to-day newsroom operations, copy flow, cross-desk coordination, and standards enforcement.",
  },
  {
    role: "Senior Correspondent (Enterprise)",
    department: "Reporting Desk",
    scope:
      "Deep investigative reporting across corporate boardrooms, manufacturing, and policy shifts.",
  },
  {
    role: "Video Producer",
    department: "Multimedia & CEO Voice",
    scope:
      "Audio-visual series production, long-form executive interviews, and digital storytelling.",
  },
  {
    role: "Partnerships Lead",
    department: "Commercial & Alliances",
    scope: "Transparent brand collaborations, media kit distribution, and event alignments.",
  },
  {
    role: "Design Lead",
    department: "Art & Brand Identity",
    scope:
      "Visual journalism, typography, responsive digital reading experiences, and print layout.",
  },
];

export default function TeamPage() {
  return (
    <>
      <div className="site-container">
        <div className="page-heading text-center">
          <span className="eyebrow">The Newsroom & Desk</span>
          <h1>The People Behind the Magazine</h1>
          <p className="mx-auto">
            MediaVault Global brings together experienced journalists, sector specialists, and
            visual storytellers committed to credible business reporting.
          </p>
        </div>

        <AboutNav />

        <div className="max-w-4xl mx-auto space-y-10 pb-12">
          {/* Founder Notice as specified */}
          <div className="publisher-notice">
            <AlertCircle className="text-primary shrink-0 mt-0.5" size={18} />
            <div>
              <strong>Publisher Masthead Notice:</strong> [FOUNDER TO CONFIRM names and bios. Do not
              publish placeholder profiles.] In accordance with our editorial standards against
              fictional journalist identities, confirmed staff bios, headshots, and verified
              LinkedIn profiles will be published upon launch approval.
            </div>
          </div>

          <section>
            <div className="mb-6">
              <span className="eyebrow">Newsroom Architecture</span>
              <h2 className="text-2xl font-serif mt-1">Editorial Masthead & Desks</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Our organization is structured across specialized desks to ensure deep sector
                expertise:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MASTHEAD_ROLES.map((item) => (
                <div key={item.role} className="masthead-card">
                  <span className="role-dept">{item.department}</span>
                  <h3 className="role-title">{item.role}</h3>
                  <p className="role-desc">{item.scope}</p>
                  <div className="pt-3 mt-auto border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Profile: Pending Founder Confirmation</span>
                    <span className="text-primary font-medium">MediaVault Desk</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Join or contact desk */}
          <section className="p-8 border border-border rounded-[var(--radius)] bg-card space-y-4">
            <h3 className="font-serif text-2xl">Connect with our Editorial Desk</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Have a pitch, an executive leak, or an operational query? Reach our editors or explore
              contributing your expertise as an independent writer.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/about/contact"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded bg-primary text-primary-foreground"
              >
                <Mail size={16} />
                Talk to the Desk
              </Link>
              <Link
                href="/about/contribute"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded border border-border hover:bg-muted transition-colors"
              >
                <Briefcase size={16} />
                Write as a Contributor
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
