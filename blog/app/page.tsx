import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { LatestArticlePreview } from "@/widgets/article/ui";
import { PopularPostWidget } from "@/widgets/popular/ui";
import { SeriesListWidget } from "@/widgets/series/ui";

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
          <LatestArticlePreview />
        </section>
        {/* Popular */}
        <section className="media-padding-x mt-4 flex flex-col gap-4 py-12">
          <PopularPostWidget />
        </section>
        {/* Series List  */}
        <section className="media-padding-x mt-4 bg-secondary py-12">
          <SeriesListWidget />
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
