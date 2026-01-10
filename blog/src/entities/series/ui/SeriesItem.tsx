import React from "react";
import { BiBookBookmark } from "react-icons/bi";

interface SeriesItemProps {
  seriesName: string;
  numOfArticles: number;
  createdAt: string;
}

export const SeriesItem: React.FC<SeriesItemProps> = ({
  seriesName,
  numOfArticles,
  createdAt
}) => {
  return (
    <div className="hover:border-brand-primary/50 group relative flex flex-col justify-between overflow-hidden rounded-xl border border-default bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-surface-1">
      {/* Decorative Book Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 text-brand-primary group-hover:bg-brand-primary group-hover:text-white">
        <BiBookBookmark size={24} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="line-clamp-1 text-heading-s text-primary group-hover:text-brand-primary">
          {seriesName}
        </h3>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <span>{numOfArticles}개의 포스트</span>
          <span className="bg-tertiary h-1 w-1 rounded-full" />
          <time className="text-tertiary">
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-primary transition-all duration-300 group-hover:w-full" />
    </div>
  );
};
