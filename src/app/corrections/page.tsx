import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/magazine/policy-page";

export const metadata: Metadata = createMetadata({
  title: "Corrections Policy",
  description:
    "How MediaVault Global handles factual errors, updates and reader requests for corrections.",
  canonicalPath: "/corrections",
  ogType: "website",
});

export default function CorrectionsPage() {
  return (
    <PolicyPage
      title="Corrections"
      intro="Trust depends on getting things right — and being transparent when we don’t."
      sections={[
        {
          title: "Report a concern",
          text: "Include the story URL, the specific statement in question and any supporting information. A dedicated editorial contact will be confirmed before launch.",
        },
        {
          title: "Review & verification",
          text: "The editorial team should review credible concerns against source material and seek clarification when needed. Requests are considered on their merits.",
        },
        {
          title: "Visible corrections",
          text: "A material factual correction should be recorded on the article with a clear description and date. Updates and clarifications should not misrepresent the original reporting.",
        },
      ]}
    />
  );
}
