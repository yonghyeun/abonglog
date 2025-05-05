import { NextResponse } from "next/server";

import { getArticleMetaListPerSeries } from "@/entities/article/model";
import { getSeriesList } from "@/entities/series/model";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // 24시간

export async function GET() {
  const baseUrl = "https://abonglog.me";

  const publishedArticleList = Object.values(
    await getArticleMetaListPerSeries().queryFn()
  ).flatMap((data) => data);

  const seriesList = await getSeriesList().queryFn();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${Object.values(publishedArticleList)
        .flatMap(
          ({ id, createdAt }) => `
        <url>
          <loc>${baseUrl}/article/${id}</loc>
          <lastmod>${new Date(createdAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
              ${seriesList
                ?.map(
                  ({ name, createdAt }) => `
        <url>
          <loc>${baseUrl}/article/list/${name}</loc>
          <lastmod>${new Date(createdAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `
                )
                .join("")}
      <url>
        <loc>${baseUrl}/article/list/all</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=60"
    }
  });
}
