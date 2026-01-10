"use client";

import Link from "next/link";
import React, { Suspense, use, useState } from "react";

import { ArticleRowCard } from "@/widgets/article/ui";

import { useGetPopularArticleList } from "@/entities/article/model";

type Period = "daily" | "weekly" | "monthly";

export const PopularArticleSlot = () => {
  const [period, setPeriod] = useState<Period>("daily");
  const promise = useGetPopularArticleList(period).promise;

  return (
    <>
      <div>
        <h1 className="mb-2 text-primary">인기글 모아보기</h1>
        <PopularNavigationBar
          period={period}
          onClick={(value: Period) => {
            setPeriod(value);
          }}
        />
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <PopularArticleGrid promise={promise} />
      </Suspense>
    </>
  );
};

interface PopularNavigationBarProps {
  period: Period;
  onClick: (value: Period) => void;
}

const popularPostNavData = [
  { name: "일간", value: "daily" },
  {
    name: "주간",
    value: "weekly"
  },
  { name: "월간", value: "monthly" }
] as const;

export const PopularNavigationBar: React.FC<PopularNavigationBarProps> = ({
  period,
  onClick
}) => {
  const activeParamIndex = popularPostNavData.findIndex(
    ({ value }) => value === period
  );

  return (
    <div className="w-fit">
      <nav>
        {popularPostNavData.map(({ name, value }) => (
          <button
            key={value}
            className={`${value === period ? "text-semibold text-brand-primary" : "text-primary"} px-10 py-4 font-semibold transition-colors duration-200`}
            onClick={() => onClick(value)}
          >
            {name}
          </button>
        ))}
      </nav>
      <div className="relative mt-2 h-0.5 w-full bg-gray-200">
        <div
          className={`absolute h-0.5 w-1/3 bg-brand-primary transition-transform duration-200`}
          style={{
            transform: `translateX(${activeParamIndex * 100}%)`
          }}
        />
      </div>
    </div>
  );
};

interface PopularArticleGridProps {
  promise: Promise<{
    articleList: {
      id: number;
      title: string;
      author: string;
      seriesName: string;
      description: string;
      createdAt: string;
      thumbnailUrl: string | null;
      tags: string[];
    }[];
  }>;
}

const PopularArticleGrid: React.FC<PopularArticleGridProps> = ({ promise }) => {
  const { articleList } = use(promise);

  return (
    <div className="flex flex-col gap-6 mt-6">
      {articleList.map((article) => (
        <Link href={`article/${article.id}`} key={article.id}>
          <ArticleRowCard {...article} />
        </Link>
      ))}
    </div>
  );
};

const LoadingGrid = () => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {Array.from({ length: 6 }, (_, idx) => {
        return (
          <div
            key={idx}
            className="flex h-48 w-full animate-pulse gap-6 border border-border bg-surface-1 p-4"
          >
            <div className="h-full w-1/3 bg-gray-200" />
            <div className="flex flex-grow flex-col gap-2">
              <div className="h-6 w-3/4 bg-gray-200" />
              <div className="h-4 w-1/2 bg-gray-200" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
