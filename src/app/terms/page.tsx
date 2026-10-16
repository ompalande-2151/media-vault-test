import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/magazine/policy-page";

export const metadata: Metadata = createMetadata(
  "Terms of use",
  "Terms for reading, sharing and submitting content to MediaVault Global.",
);

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of use"
      intro="The foundation for a respectful and useful publication."
      sections={[
        {
          title: "Editorial information",
          text: "Content is provided for general information, not financial, investment, legal or professional advice. Preview articles and profiles are illustrative samples.",
        },
        {
          title: "Content & copyright",
          text: "Reproduction of publication content requires appropriate permission. Share links to stories rather than copying full articles. Applicable ownership and licensing details must be confirmed before launch.",
        },
        {
          title: "Story submissions",
          text: "Only submit information that you have the right to share. Submission does not guarantee publication. Final publication and permissions are subject to editorial review and agreement.",
        },
        {
          title: "Commercial relationships",
          text: "Partnerships are clearly disclosed and do not guarantee independent editorial coverage or earned-media outcomes.",
        },
        {
          title: "Publisher details",
          text: "Publisher legal identity, contact details, applicable jurisdiction and final terms require review and approval before publication.",
        },
      ]}
    />
  );
}
