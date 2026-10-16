import { redirect } from "next/navigation";
import { INDUSTRIES_CATEGORIES } from "@/lib/industriesData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string }[] = [];
  for (const sub of INDUSTRIES_CATEGORIES) {
    const sSlug = subSlug(sub);
    params.push({ subcategory: sSlug });
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-") });
    }
  }
  return params;
}

export default async function IndustrySubcategoryRedirect({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  redirect(`/category/industries/${subcategory}`);
}
