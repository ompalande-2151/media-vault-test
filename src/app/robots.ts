import type { MetadataRoute } from "next";
import { toAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/search"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/search"],
      },
    ],
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
