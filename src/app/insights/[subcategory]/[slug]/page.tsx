import { redirect } from "next/navigation";
import { INSIGHTS_ARTICLES } from "@/lib/insightsData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string; slug: string }[] = [];
  for (const a of INSIGHTS_ARTICLES) {
    const sSlug = subSlug(a.subcategory);
    params.push({ subcategory: sSlug, slug: a.slug });
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-"), slug: a.slug });
    }
  }
  return params;
}

export default async function InsightsSubcategorySlugRedirect({
  params,
}: {
  params: Promise<{ subcategory: string; slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/article/${slug}`);
}
