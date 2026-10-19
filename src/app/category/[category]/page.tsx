import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCategories } from "@/lib/queries";
import { createMetadata, createNotFoundMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, safeJsonLd } from "@/lib/structured-data";
import { CategoryPage } from "@/components/magazine/category-page";

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = getCategory(catSlug);
  if (!category) {
    return createNotFoundMetadata("Section Unavailable");
  }
  return createMetadata({
    title: `${category.name} | MediaVault Global`,
    description: category.intro,
    canonicalPath: `/category/${category.slug}`,
    ogType: "website",
    keywords: [category.name, ...category.subs, "India business", "enterprise reporting"],
  });
}

export default async function CategoryIndexPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: catSlug } = await params;
  const category = getCategory(catSlug);
  if (!category) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: `/category/${category.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            getCollectionPageJsonLd(category.name, category.intro, `/category/${category.slug}`),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <CategoryPage category={category} />
    </>
  );
}
