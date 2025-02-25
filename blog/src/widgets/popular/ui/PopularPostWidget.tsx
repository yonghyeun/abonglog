"use client";

import { popularPostNavData } from "../config";
import { useState } from "react";

import { PostCard } from "@/entities/preview/ui";

const mockPopularPostData = Array.from({ length: 12 }, (_, idx) => ({
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
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {mockPopularPostData.map((data) => (
          <PostCard {...data} key={data.postId} />
        ))}
      </section>
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
