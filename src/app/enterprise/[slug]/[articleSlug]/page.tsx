import { redirect } from "next/navigation";
import { ENTERPRISE_ARTICLES } from "@/lib/enterpriseData";
import { subSlug } from "@/lib/queries";

export async function generateStaticParams() {
  const params: { slug: string; articleSlug: string }[] = [];
  for (const a of ENTERPRISE_ARTICLES) {
    const sSlug = subSlug(a.subcategory);
    params.push({ slug: sSlug, articleSlug: a.slug });
    if (sSlug.includes("-and-")) {
      params.push({ slug: sSlug.replace("-and-", "-"), articleSlug: a.slug });
    }
  }
  return params;
}

export default async function EnterpriseSubcategoryArticleRedirect({
  params,
}: {
  params: Promise<{ slug: string; articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  redirect(`/article/${articleSlug}`);
}
