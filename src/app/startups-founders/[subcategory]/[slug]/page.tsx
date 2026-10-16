import { redirect } from "next/navigation";
import { STARTUPS_FOUNDERS_ARTICLES } from "@/lib/startupsFoundersData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  return STARTUPS_FOUNDERS_ARTICLES.map((a) => ({
    subcategory: subSlug(a.subcategory),
    slug: a.slug,
  }));
}

export default async function StartupFoundersSlugRedirect({
  params,
}: {
  params: Promise<{ subcategory: string; slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/article/${slug}`);
}
