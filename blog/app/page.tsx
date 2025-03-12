import {
  LatestArticleSlot,
  PopularArticleSlot,
  SeriesListSlot
} from "@/slots/main/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { prefetechQueryWithCache } from "@/app/cache/lib";

import {
  getArticleInfoPerSeries,
  getLatestArticle,
  getPopularArticleList
} from "@/entities/article/model";

const getMainPageState = async () => {
  return prefetechQueryWithCache({
    callbacks: [
      getArticleInfoPerSeries,
      getLatestArticle,
      () => getPopularArticleList("daily")
    ],
    options: {
      revalidate: 86400
    }
  });
};

const MainPage = async () => {
  const mainPageState = await getMainPageState();

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
