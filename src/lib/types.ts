export interface Article {
  id?: string;
  slug: string;
  headline: string;
  title?: string;
  summary: string;
  excerpt?: string;
  metaDescription?: string;
  category: string;
  subcategory: string;
  image: string;
  alt: string;
  author: string;
  tags: string[];
  region: string;
  publishedAt: string;
  date?: string;
  customHref?: string;
  status: "published" | "draft";
  disclosure: "Editorial" | "Opinion" | "Sponsored";
  readingTime: number;
  body: { title: string; text: string }[];
  paragraphs?: string[];
  standfirst?: string;
  pullQuote?: string;
  series?: string;
  keywords?: string[];
  sourceNotes?: string[];
  factBox?: string;
  imagePrompt?: string;
}

export interface Category {
  slug: string;
  name: string;
  intro: string;
  subs: string[];
}

export interface Leader {
  slug: string;
  name: string;
  role: string;
  company: string;
  location: string;
  image: string;
  article: string;
  bio: string;
}

export interface Author {
  slug: string;
  name: string;
  bio: string;
}

export interface Issue {
  slug: string;
  month: string;
  year: number;
  title: string;
  theme: string;
  image: string;
  stories: string[];
}

export interface Video {
  slug: string;
  title: string;
  series: string;
  image: string;
  summary: string;
  providerId: string;
  transcript: string;
}
