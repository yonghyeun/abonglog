import type { PopularSearchParams } from "../../types";
import { popularPostNavData } from "../config";
import Link from "next/link";

import { PostCard } from "@/entities/preview/ui";

interface PopularPostWidgetProps {
  searchParams: Promise<{
    popular?: PopularSearchParams;
  }>;
}

const mockPopularPostData = Array.from({ length: 4 }, (_, idx) => ({
  postId: idx + 1,
  title: "Lorem ipsum dolor",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum voluptates dolores, tempore optio modi sequi numquam at temporibus voluptatibus repudiandae ipsum aliquam ducimus ",
  createdAt: new Date().toDateString(),
  thumbnailUrl: "/images/latest_post_thumbnail.jpg",
  tags: [
    { id: 1, name: "react" },
    { id: 2, name: "Typescript" },
    { id: 3, name: "jest" }
  ]
}));

export const PopularPostWidget: React.FC<PopularPostWidgetProps> = async ({
  searchParams
}) => {
  const { popular = "daily" } = await searchParams;

  return (
    <section className="flex flex-col gap-4 py-4">
      <div>
        <h1 className="mb-2">인기글 모아보기</h1>
        <PopularNavigationBar activeParam={popular} />
      </div>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {mockPopularPostData.map((data) => (
          <PostCard {...data} key={data.postId} />
        ))}
      </section>
    </section>
  );
};

interface PopularNavigationBarProps {
  activeParam: PopularSearchParams;
}

export const PopularNavigationBar: React.FC<PopularNavigationBarProps> = ({
  activeParam
}) => {
  const activeParamIndex = popularPostNavData.findIndex(
    ({ value }) => value === activeParam
  );

  return (
    <div className="w-fit">
      <nav>
        {popularPostNavData.map(({ name, value }) => (
          <Link
            href={`./?popular=${value}`}
            key={value}
            className={`${value === activeParam ? "text-sky-blue text-semibold" : ""} px-10 py-4 font-semibold transition-colors duration-200`}
            replace
            scroll={false}
          >
            {name}
          </Link>
        ))}
      </nav>
      <div className="bg-secondary relative mt-2 h-0.5 w-full">
        <div
          className={`bg-sky-blue absolute h-0.5 w-1/3 transition-transform duration-200`}
          style={{
            transform: `translateX(${activeParamIndex * 100}%)`
          }}
        />
      </div>
    </div>
  );
};
