import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCategories, subSlug } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
import { CategoryPage } from "@/components/magazine/category-page";

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  for (const c of getCategories()) {
    for (const sub of c.subs) {
      const sSlug = subSlug(sub);
      params.push({ category: c.slug, subcategory: sSlug });
      if (sSlug.includes("-and-")) {
        params.push({ category: c.slug, subcategory: sSlug.replace("-and-", "-") });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlugParam } = await params;
  const category = getCategory(catSlug);
  const selected = category?.subs.find(
    (s) => subSlug(s) === subSlugParam || subSlug(s).replace("-and-", "-") === subSlugParam,
  );
  if (!category || !selected)
    return createMetadata("Section unavailable", "Explore more perspectives.");
  return createMetadata(selected, `${selected}: ${category.intro}`);
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: catSlug, subcategory: subSlugParam } = await params;
  const category = getCategory(catSlug);
  const selected = category?.subs.find(
    (s) => subSlug(s) === subSlugParam || subSlug(s).replace("-and-", "-") === subSlugParam,
  );
  if (!category || !selected) notFound();

  return <CategoryPage category={category} selected={selected} />;
}
