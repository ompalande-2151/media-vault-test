import { redirect } from "next/navigation";
import { LEADERSHIP_CATEGORIES } from "@/lib/leadershipData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string }[] = [];
  for (const sub of LEADERSHIP_CATEGORIES) {
    const sSlug = subSlug(sub);
    params.push({ subcategory: sSlug });
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-") });
    }
  }
  return params;
}

export default async function LeadershipSubcategoryRedirect({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  redirect(`/category/leadership/${subcategory}`);
}
