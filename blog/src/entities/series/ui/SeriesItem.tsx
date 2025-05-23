import React from "react";

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
    <div className="flex flex-grow transform flex-col gap-2 rounded-lg bg-primary p-4 text-secondary transition-all duration-200 hover:scale-105">
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold text-primary">{seriesName}</p>
        <span className="text-sm">({numOfArticles})</span>
      </div>
      <p className="text-xs">
        마지막 업데이트: <time>{new Date(createdAt).toLocaleString()}</time>
      </p>
    </div>
  );
};
