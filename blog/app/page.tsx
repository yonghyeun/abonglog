import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { PopularPostWidget } from "@/widgets/popular/ui";
import { SeriesListWidget } from "@/widgets/series/ui";

import { LatestArticlePreview } from "@/entities/article/ui";
import { getSeriesArticleList } from "@/entities/series/model";

import { prefetchQueryInServer } from "@/shared/model";

const mockLatestPostPreviewProps = {
  postId: 1,
  title: "함수형 사고로 FSD 구조에서 레이어의 역할 이해하기 (feat : 리액트)",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis alias, beatae tempora totam officia eum, dolorem illum possimus provident eaque cumque",
  createdAt: new Date().toDateString(),
  thumbnailUrl: "/images/latest_post_thumbnail.jpg"
};

const MainPage = async () => {
  const seriesListState = await prefetchQueryInServer(getSeriesArticleList);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Latest Post */}
      <LatestArticlePreview {...mockLatestPostPreviewProps} />
      {/* Popular */}
      <PopularPostWidget />

      <HydrationBoundary state={seriesListState}>
        <section className="media-padding-x mt-4 gap-4 bg-secondary py-12">
          <SeriesListWidget />
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
