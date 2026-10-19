import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Search Editorial Stories & Insights | MediaVault Global",
  description:
    "Search stories, people, industries, manufacturing corridors and founder playbooks on MediaVault Global.",
  canonicalPath: "/search",
  noIndex: true,
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
