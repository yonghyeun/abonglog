import React from "react";

interface SeriesItemProps {
  seriesName: string;
  numOfArticles: number;
  updatedAt: string;
}

export const SeriesItem: React.FC<SeriesItemProps> = ({
  seriesName,
  numOfArticles,
  updatedAt
}) => {
  return (
    <div className="flex-grow rounded-md border bg-primary p-2">
      <div className="flex items-center gap-2">
        <h3>{seriesName}</h3>
        <span className="text-sm text-gray-400">({numOfArticles})</span>
      </div>
      <p className="text-xs text-gray-500">
        마지막 업데이트: <time>{updatedAt}</time>
      </p>
    </div>
  );
};
