"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import { ArticleRowCard } from "@/widgets/article/ui";

import {
  useGetInfiniteArticleListBySeries,
  useGetNumberOfArticles
} from "@/entities/article/model";

import { useObserver } from "@/shared/lib";

interface ArticleListBySeriesSlotProps {
  seriesName: string;
}

const ArticleList = ({
  seriesName,
  numOfArticles
}: {
  seriesName: string;
  numOfArticles: number;
}) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteArticleListBySeries("published", seriesName, numOfArticles);

  const observerRef = useObserver(() => fetchNextPage());

  return (
    <>
      <section className="p-2">
        <div className="flex flex-col gap-6">
          {pages.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id}>
              <ArticleRowCard {...article} />
            </Link>
          ))}

          {/* loading Skeleton */}
          {isFetchingNextPage &&
            Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="border-border flex h-48 w-full animate-pulse gap-6 border bg-surface-1 p-4"
                >
                  <div className="h-full w-1/3 bg-gray-200" />
                  <div className="flex flex-grow flex-col gap-2">
                    <div className="h-6 w-3/4 bg-gray-200" />
                    <div className="h-4 w-1/2 bg-gray-200" />
                  </div>
                </div>
              ))}
        </div>
        {/* Infinite scroll observer */}
        {hasNextPage ? (
          <div ref={observerRef} className="h-10" />
        ) : (
          <div className="flex items-center justify-center py-12 text-secondary">
            {seriesName}의 모든 게시글을 불러왔습니다.
          </div>
        )}
      </section>
    </>
  );
};

export const ArticleListBySeriesSlot: React.FC<
  ArticleListBySeriesSlotProps
> = ({ seriesName }) => {
  const { data: numOfArticles } = useGetNumberOfArticles(seriesName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="flex flex-col items-center">
        <h3>시리즈별로 보기</h3>
        <div className="flex items-center gap-2">
          <h1 className="text-brand-primary">{seriesName}</h1>
          <span className="text-secondary">({numOfArticles})</span>
        </div>
      </header>
      <ArticleList seriesName={seriesName} numOfArticles={numOfArticles} />
    </Suspense>
  );
};
