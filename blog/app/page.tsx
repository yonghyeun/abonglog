import {
  LatestArticleSlot,
  PopularArticleSlot,
  SeriesListSlot
} from "@/slots/main/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import {
  getArticleInfoPerSeries,
  getLatestArticle,
  getPopularArticleList
} from "@/entities/article/model";

import { prefetchQueryInServer } from "@/shared/model";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return [];
}

const MainPage = async () => {
  const mainPageState = await prefetchQueryInServer(
    getArticleInfoPerSeries,
    getLatestArticle,
    () => getPopularArticleList("daily")
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={mainPageState}>
        {/* Latest Post */}
        <section className="media-padding-x min-h-48 bg-secondary py-12">
          <LatestArticleSlot />
        </section>
        {/* Popular */}
        <section className="media-padding-x mt-4 flex flex-col gap-4 py-12">
          <PopularArticleSlot />
        </section>
        {/* Series List  */}
        <section className="media-padding-x mt-4 bg-secondary py-12">
          <SeriesListSlot />
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
