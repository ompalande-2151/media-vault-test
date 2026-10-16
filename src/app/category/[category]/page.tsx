import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCategories } from "@/lib/queries";
import { createMetadata } from "@/lib/seo";
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
  if (!category)
    return createMetadata(
      "Section unavailable",
      "Explore MediaVault Global business perspectives.",
    );
  return createMetadata(category.name, category.intro);
}

export default async function CategoryIndexPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: catSlug } = await params;
  const category = getCategory(catSlug);
  if (!category) notFound();

  return <CategoryPage category={category} />;
}
