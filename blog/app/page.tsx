import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { LatestArticlePreview } from "@/widgets/article/ui/LatestArticlePreview";
import { PopularPostWidget } from "@/widgets/popular/ui";
import { SeriesListWidget } from "@/widgets/series/ui";

import { getLatestArticle } from "@/entities/article/model";
import { getPopularArticleList } from "@/entities/article/model/getPolularArticleList";
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
        <PopularPostWidget />

        <section className="media-padding-x mt-4 bg-secondary py-12">
          <SeriesListWidget />
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
