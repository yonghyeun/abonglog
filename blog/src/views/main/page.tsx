import { PopularPostWidget } from "@/widgets/popular/ui";
import type { PopularSearchParams } from "@/widgets/types";

import { LatestPostPreview } from "@/entities/preview/ui";

const mockLatestPostPreviewProps = {
  postId: 1,
  title: "함수형 사고로 FSD 구조에서 레이어의 역할 이해하기 (feat : 리액트)",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis alias, beatae tempora totam officia eum, dolorem illum possimus provident eaque cumque",
  createdAt: new Date().toDateString(),
  thumbnailUrl: "/images/latest_post_thumbnail.jpg"
};

export const MainPage: React.FC<{
  searchParams: Promise<{
    popular?: PopularSearchParams;
  }>;
}> = async ({ searchParams }) => {
  return (
    <>
      {/* Latest Post */}
      <LatestPostPreview {...mockLatestPostPreviewProps} />
      {/* Popular */}
      <div className="media-padding-x mt-4">
        <PopularPostWidget searchParams={searchParams} />
      </div>
      {/* Series */}
      <div></div>
      {/* tag */}
      <div></div>
    </>
  );
};
