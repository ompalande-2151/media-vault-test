import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/magazine/enquiry-form";

export const metadata: Metadata = createMetadata(
  "Pitch a story",
  "Share a founder journey, leadership perspective or company story with the MediaVault Global editorial team.",
);

export default function SubmitAStoryPage() {
  return (
    <div className="site-container">
      <div className="page-heading">
        <span className="eyebrow">Good stories start with a conversation</span>
        <h1>What’s your story?</h1>
        <p>
          A bold idea. A hard-earned lesson. A business doing things differently. We’re interested
          in the stories that help our readers see what comes next.
        </p>
      </div>
      <div className="form-layout">
        <div className="prose-page">
          <h2>A perspective worth sharing.</h2>
          <p>
            We welcome pitches from founders, business leaders and people building meaningful change
            across India.
          </p>
          <h2>What we look for</h2>
          <p>
            Original insights, specific lessons and a clear reason the story matters to leaders and
            builders. Include useful context and links that help us understand your work.
          </p>
          <h2>What happens next</h2>
          <p>
            Our editorial team reviews each pitch for relevance, credibility and reader value.
            Submission does not guarantee publication.
          </p>
        </div>
        <EnquiryForm kind="story" />
      </div>
    </div>
  );
}
