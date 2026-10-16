import type { Metadata } from "next";
import { Header, Footer } from "@/components/magazine/site-shell";
import "@/styles.css";

export const metadata: Metadata = {
  title: "MediaVault Global | Business, leadership & what comes next",
  description:
    "The people, ideas and businesses shaping what comes next — from India to the world. Explore MediaVault Global.",
  icons: {
    icon: [{ url: "/assets/ICON - MVGM.png" }, { url: "/icon.png" }],
    shortcut: "/assets/ICON - MVGM.png",
    apple: "/assets/ICON - MVGM.png",
  },
  openGraph: {
    title: "MediaVault Global | Business, leadership & what comes next",
    description:
      "The people, ideas and businesses shaping what comes next — from India to the world. Explore MediaVault Global.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaVault Global",
    description:
      "The people, ideas and businesses shaping what comes next — from India to the world.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/ICON - MVGM.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/ICON - MVGM.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Spectral:ital,wght@0,300;0,400;0,500;1,400&display=swap"
          rel="stylesheet"
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
