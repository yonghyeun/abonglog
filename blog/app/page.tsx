import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import { Suspense } from "react";

import { PopularPostWidget } from "@/widgets/popular/ui";
import { SeriesListWidget } from "@/widgets/series/ui";

import { LatestArticlePreview } from "@/entities/article/ui";
import { getSeriesList } from "@/entities/series/model";

const mockLatestPostPreviewProps = {
  postId: 1,
  title: "함수형 사고로 FSD 구조에서 레이어의 역할 이해하기 (feat : 리액트)",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis alias, beatae tempora totam officia eum, dolorem illum possimus provident eaque cumque",
  createdAt: new Date().toDateString(),
  thumbnailUrl: "/images/latest_post_thumbnail.jpg"
};

const MainPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getSeriesList());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Latest Post */}
      <LatestArticlePreview {...mockLatestPostPreviewProps} />
      {/* Popular */}
      <PopularPostWidget />

      <Suspense fallback={<div>Loading...</div>}>
        <section className="media-padding-x mt-4 gap-4 bg-secondary py-12">
          <SeriesListWidget />
        </section>
      </Suspense>
    </HydrationBoundary>
  );
};

export default MainPage;
