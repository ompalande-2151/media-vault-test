import { redirect } from "next/navigation";
import { INSIGHTS_CATEGORIES } from "@/lib/insightsData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string }[] = [];
  for (const sub of INSIGHTS_CATEGORIES) {
    const sSlug = subSlug(sub);
    params.push({ subcategory: sSlug });
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-") });
    }
  }
  return params;
}

export default async function InsightsSubcategoryRedirect({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  redirect(`/category/insights/${subcategory}`);
}
