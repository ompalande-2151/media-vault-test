import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Spectral } from "next/font/google";
import { Header, Footer } from "@/components/magazine/site-shell";
import "@/styles.css";
import { SITE_CONFIG, toAbsoluteUrl } from "@/lib/seo";
import { getOrganizationJsonLd, getWebsiteJsonLd, safeJsonLd } from "@/lib/structured-data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-google",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-editorial-google",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.defaultDescription,
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/assets/ICON - MVGM.png" }, { url: "/icon.png" }],
    shortcut: "/assets/ICON - MVGM.png",
    apple: "/assets/ICON - MVGM.png",
  },
  openGraph: {
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    type: "website",
    siteName: SITE_CONFIG.siteName,
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.siteUrl,
    images: [
      {
        url: toAbsoluteUrl(SITE_CONFIG.defaultOgImage),
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.siteName,
    description: SITE_CONFIG.defaultDescription,
    images: [toAbsoluteUrl(SITE_CONFIG.defaultOgImage)],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spectral.variable}`}>
      <head>
        <link rel="icon" href="/assets/ICON - MVGM.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/ICON - MVGM.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
