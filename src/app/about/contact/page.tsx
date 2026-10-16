import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, AlertCircle, ShieldAlert, Newspaper, Handshake } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { AboutNav } from "@/components/magazine/about-nav";
import { DeskContactForm } from "@/components/magazine/desk-contact-form";
import { Newsletter } from "@/components/magazine/newsletter";

export const metadata: Metadata = createMetadata(
  "Contact MediaVault Global",
  "Reach the MediaVault Global editorial desk, partnerships team, corrections desk and press contacts.",
);

const DIRECT_DESKS = [
  {
    icon: Newspaper,
    label: "Editorial Tips & Story Pitches",
    email: "tips@mediavaultglobal.com",
    tag: "[FOUNDER TO CONFIRM email]",
    desc: "Whistleblower tips, executive developments, company profiling requests, and story submissions.",
  },
  {
    icon: Handshake,
    label: "Partnerships & Advertising",
    email: "partnerships@mediavaultglobal.com",
    tag: "[FOUNDER TO CONFIRM email]",
    desc: "Commercial alliances, sponsored features, newsletter sponsorship, and media kit inquiries.",
  },
  {
    icon: ShieldAlert,
    label: "Corrections & Verification",
    email: "corrections@mediavaultglobal.com",
    tag: "[FOUNDER TO CONFIRM email]",
    desc: "Report a factual inconsistency, source attribution error, or request a published clarification.",
  },
  {
    icon: MessageSquare,
    label: "Press & Media Inquiries",
    email: "press@mediavaultglobal.com",
    tag: "[FOUNDER TO CONFIRM email]",
    desc: "Media appearances, journalist interview requests, and brand citation licensing.",
  },
];

export default function AboutContactPage() {
  return (
    <>
      <div className="site-container">
        <div className="page-heading text-center">
          <span className="eyebrow">Direct Newsroom Access</span>
          <h1>Talk to the Desk</h1>
          <p className="mx-auto">
            Whether you have a frontline tip, an inquiry regarding commercial collaborations, or
            feedback on our reporting, our desks are directly accessible.
          </p>
        </div>

        <AboutNav />

        <div className="form-layout">
          {/* Left Column: Direct Desk Directory & Confirmation notes */}
          <div className="space-y-8">
            <div>
              <span className="eyebrow">Direct Contact Channels</span>
              <h2 className="text-2xl font-serif mt-1 mb-4">Department Desks</h2>
              <div className="space-y-4">
                {DIRECT_DESKS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={d.label}
                      className="p-5 border border-border rounded-[var(--radius)] bg-card space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={18} className="text-primary" />
                        <h3 className="font-semibold text-sm">{d.label}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                      <div className="pt-2 text-xs font-mono flex items-center justify-between text-foreground">
                        <span className="font-medium text-primary">{d.email}</span>
                        <span className="text-[10px] text-muted-foreground">{d.tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="publisher-notice">
              <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Confirmation Status:</strong> Primary email forwarding addresses are
                under publisher DNS configuration. Submitted messages via the secure desk form
                will be stored and acknowledged.
              </div>
            </div>
          </div>

          {/* Right Column: Desk Contact Form */}
          <div className="p-8 border border-border rounded-[var(--radius)] bg-card shadow-xs">
            <div className="mb-6">
              <span className="eyebrow">Online Transmission</span>
              <h2 className="text-2xl font-serif mt-1">Send a Message to the Desk</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Our newsroom and partnership coordinators review all submissions. Form responses
                receive an automated acknowledgement with response within two working days.
              </p>
            </div>

            <DeskContactForm />
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
