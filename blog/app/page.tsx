import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import {
  LatestArticleView,
  PopularArticleView,
  SeriesListView
} from "@/views/main/ui";

import {
  getLatestArticle,
  getPopularArticleList
} from "@/entities/article/model";
import { getSeriesArticleList } from "@/entities/series/model";

import { prefetchQueryInServer } from "@/shared/model";

const MainPage = async () => {
  const mainPageState = await prefetchQueryInServer(
    getSeriesArticleList,
    getLatestArticle,
    () => getPopularArticleList("daily")
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={mainPageState}>
        {/* Latest Post */}
        <section className="media-padding-x min-h-48 bg-secondary py-12">
          <LatestArticleView />
        </section>
        {/* Popular */}
        <section className="media-padding-x mt-4 flex flex-col gap-4 py-12">
          <PopularArticleView />
        </section>
        {/* Series List  */}
        <section className="media-padding-x mt-4 bg-secondary py-12">
          <SeriesListView />
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
