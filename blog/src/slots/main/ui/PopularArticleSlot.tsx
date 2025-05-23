"use client";

import Link from "next/link";
import React, { Suspense, use, useState } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { useGetPopularArticleList } from "@/entities/article/model";

import { Grid } from "@/shared/ui/Grid";

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
            className={`${value === period ? "text-semibold text-purple-500" : "text-primary"} px-10 py-4 font-semibold transition-colors duration-200`}
            onClick={() => onClick(value)}
          >
            {name}
          </button>
        ))}
      </nav>
      <div className="relative mt-2 h-0.5 w-full bg-gray-200">
        <div
          className={`absolute h-0.5 w-1/3 bg-purple-500 transition-transform duration-200`}
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
    <Grid>
      {articleList.map((article) => (
        <Grid.Item key={article.id}>
          <Link href={`article/${article.id}`}>
            <ArticlePreviewCard {...article} />
          </Link>
        </Grid.Item>
      ))}
    </Grid>
  );
};

const LoadingGrid = () => {
  return (
    <Grid>
      {Array.from({ length: 12 }, (_, idx) => {
        return (
          <Grid.Item key={idx}>
            <div className="w-fill bg-disabled-bg-color aspect-square animate-pulse" />
          </Grid.Item>
        );
      })}
    </Grid>
  );
};
