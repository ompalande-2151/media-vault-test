import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/magazine/policy-page";

export const metadata: Metadata = createMetadata(
  "Editorial policy & standards",
  "Our commitment to editorial independence, accurate reporting, clear disclosures and reader trust.",
);

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      title="Editorial principles"
      intro="Credibility is earned in every story. These principles guide the publication we are building."
      sections={[
        {
          title: "Independent judgement",
          text: "Story selection is based on editorial relevance, credibility and reader value. Payment does not secure earned editorial coverage.",
        },
        {
          title: "Accuracy & accountability",
          text: "Reported facts should be verified, sources should be represented fairly, and claims should have appropriate context. Material errors should be corrected visibly.",
        },
        {
          title: "Clear commercial disclosures",
          text: "Editorial, sponsored, partner, opinion, press-release and award-related content must be clearly identified. Commercial partnerships are kept distinct from independent reporting.",
        },
        {
          title: "Fairness & conflicts",
          text: "Relevant relationships and conflicts should be disclosed. The publication should provide an appropriate opportunity to respond to substantive criticism.",
        },
      ]}
    />
  );
}
