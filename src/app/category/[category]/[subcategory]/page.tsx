import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCategories, subSlug } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, safeJsonLd } from "@/lib/structured-data";
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
  if (!category || !selected) {
    return createNotFoundMetadata("Section Unavailable");
  }

  const canonicalSubSlug = subSlug(selected);

  return createMetadata({
    title: `${selected} | ${category.name} | MediaVault Global`,
    description: `${selected} insights, analysis and reports across ${category.name.toLowerCase()} in India.`,
    canonicalPath: `/category/${category.slug}/${canonicalSubSlug}`,
    ogType: "website",
    keywords: [selected, category.name, "Indian business", "industry reporting"],
  });
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

  const canonicalSubSlug = subSlug(selected);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: `/category/${category.slug}` },
    { name: selected, path: `/category/${category.slug}/${canonicalSubSlug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            getCollectionPageJsonLd(
              `${selected} — ${category.name}`,
              `${selected}: ${category.intro}`,
              `/category/${category.slug}/${canonicalSubSlug}`,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <CategoryPage category={category} selected={selected} />
    </>
  );
}
