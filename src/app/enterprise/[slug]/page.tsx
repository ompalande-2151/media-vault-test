import { redirect } from "next/navigation";
import { ENTERPRISE_ARTICLES, ENTERPRISE_CATEGORIES } from "@/lib/enterpriseData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const articleParams = ENTERPRISE_ARTICLES.map((a) => ({ slug: a.slug }));
  const subcategoryParams = ENTERPRISE_CATEGORIES.map((s) => ({ slug: subSlug(s) }));
  return [...articleParams, ...subcategoryParams];
}

export default async function EnterpriseSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if this slug matches a subcategory
  const isSubcategory = ENTERPRISE_CATEGORIES.some(
    (s) => subSlug(s) === slug || subSlug(s).replace("-and-", "-") === slug,
  );

  if (isSubcategory) {
    redirect(`/category/enterprise/${slug}`);
  }

  // Otherwise treat as article slug
  redirect(`/article/${slug}`);
}
