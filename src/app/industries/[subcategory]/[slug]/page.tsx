import { redirect } from "next/navigation";
import { INDUSTRIES_ARTICLES } from "@/lib/industriesData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { subcategory: string; slug: string }[] = [];
  for (const a of INDUSTRIES_ARTICLES) {
    const sSlug = subSlug(a.subcategory);
    params.push({ subcategory: sSlug, slug: a.slug });
    // Also include without "-and-" if present (e.g. retail-ecommerce)
    if (sSlug.includes("-and-")) {
      params.push({ subcategory: sSlug.replace("-and-", "-"), slug: a.slug });
    }
  }
  return params;
}

export default async function IndustrySubcategorySlugRedirect({
  params,
}: {
  params: Promise<{ subcategory: string; slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/article/${slug}`);
}
