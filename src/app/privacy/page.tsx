import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/magazine/policy-page";

export const metadata: Metadata = createMetadata(
  "Privacy policy",
  "Privacy information for readers, newsletter subscribers and people contacting MediaVault Global.",
);

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      intro="Your information deserves clear choices and careful handling."
      sections={[
        {
          title: "Information you choose to share",
          text: "Newsletter and enquiry forms request only information relevant to your subscription or message. Form delivery is not enabled in this preview, and submissions are not stored by this site.",
        },
        {
          title: "Newsletter preferences",
          text: "When connected, the newsletter provider will manage confirmation and unsubscribe requests. Subscription requires explicit consent.",
        },
        {
          title: "Third-party services",
          text: "Publication launch may use external form, newsletter and video providers. Their identities, data handling, retention and applicable privacy terms must be confirmed in this policy before activation.",
        },
        {
          title: "Cookies & analytics",
          text: "No advertising or analytics trackers are enabled in this preview. Optional analytics will require appropriate consent before being loaded.",
        },
        {
          title: "Your requests",
          text: "Publisher identity and a privacy contact must be added before launch so readers can request access, correction or deletion of relevant personal information.",
        },
      ]}
    />
  );
}
