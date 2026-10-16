import { redirect } from "next/navigation";
import { MSME_GROWTH_CATEGORIES } from "@/lib/msmeGrowthData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string }[] = [];
  for (const sub of MSME_GROWTH_CATEGORIES) {
    const sSlug = subSlug(sub);
    params.push({ subcategory: sSlug });
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-") });
    }
  }
  return params;
}

export default async function GrowthSubcategoryRedirect({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  redirect(`/category/msme-growth/${subcategory}`);
}
