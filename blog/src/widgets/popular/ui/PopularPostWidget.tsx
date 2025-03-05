"use client";

import { popularPostNavData } from "../config";
import { useState } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { Grid } from "@/shared/ui/Grid";

const mockPopularPostData = Array.from({ length: 12 }, (_, idx) => ({
  articleId: idx + 1,
  title: "Lorem ipsum dolor",
  seriesName: "React 심화 시리즈",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum voluptates dolores, tempore optio modi sequi numquam at temporibus voluptatibus repudiandae ipsum aliquam ducimus ",
  updatedAt: new Date().toDateString(),
  thumbnailUrl: "/images/latest_post_thumbnail.jpg",
  tags: ["react", "TS", "javascript"]
}));

type PopularMenu = "daily" | "weekly" | "monthly";

export const PopularPostWidget = () => {
  const [popularMenu, setPopularMenu] = useState<PopularMenu>("daily");

  const handleClick = (value: PopularMenu) => {
    setPopularMenu(value);
  };

  return (
    <section className="media-padding-x mt-4 flex flex-col gap-4 py-4">
      <div>
        <h1 className="mb-2">인기글 모아보기</h1>
        <PopularNavigationBar popularMenu={popularMenu} onClick={handleClick} />
      </div>
      <Grid>
        {mockPopularPostData.map((data) => (
          <Grid.Item key={data.articleId}>
            <ArticlePreviewCard {...data} key={data.articleId} />
          </Grid.Item>
        ))}
      </Grid>
    </section>
  );
};

interface PopularNavigationBarProps {
  popularMenu: PopularMenu;
  onClick: (value: PopularMenu) => void;
}

export const PopularNavigationBar: React.FC<PopularNavigationBarProps> = ({
  popularMenu,
  onClick
}) => {
  const activeParamIndex = popularPostNavData.findIndex(
    ({ value }) => value === popularMenu
  );

  return (
    <div className="w-fit">
      <nav>
        {popularPostNavData.map(({ name, value }) => (
          <button
            key={value}
            className={`${value === popularMenu ? "text-semibold text-sky-blue" : ""} px-10 py-4 font-semibold transition-colors duration-200`}
            onClick={() => onClick(value)}
          >
            {name}
          </button>
        ))}
      </nav>
      <div className="relative mt-2 h-0.5 w-full bg-secondary">
        <div
          className={`absolute h-0.5 w-1/3 bg-sky-blue transition-transform duration-200`}
          style={{
            transform: `translateX(${activeParamIndex * 100}%)`
          }}
        />
      </div>
    </div>
  );
};
