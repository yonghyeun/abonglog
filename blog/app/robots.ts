import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/temp/"]
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/temp/"]
      },
      {
        userAgent: "Naverbot",
        allow: ["/"],
        disallow: ["/temp/"]
      },
      {
        userAgent: "Yeti",
        allow: ["/"],
        disallow: ["/temp/"]
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/temp/"]
      }
    ],
    // TODO siteMap 생성하기
    sitemap: "https://abonglog.me/sitemap.xml"
  };
}
