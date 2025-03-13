"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import {
  useGetInfiniteArticleListBySeries,
  useGetNumberOfArticles
} from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

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
        <Grid>
          {pages.map((article) => (
            <Grid.Item key={article.id}>
              <Link href={`/article/${article.id}`}>
                <ArticlePreviewCard {...article} />
              </Link>
            </Grid.Item>
          ))}

          {/* loading Skeleton */}
          {isFetchingNextPage &&
            Array(6)
              .fill(0)
              .map((_, idx) => (
                <Grid.Item key={idx}>
                  <div className="aspect-square animate-pulse bg-gray-200" />
                </Grid.Item>
              ))}
        </Grid>
        {/* Infinite scroll observer */}
        {hasNextPage ? (
          <div ref={observerRef} />
        ) : (
          <div className="flex items-center justify-center py-12 text-gray-400">
            {seriesName}의 모든 게시글을 가져왔습니다.
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
          <h1 className="text-blue-500">{seriesName}</h1>
          <span className="text-secondary">({numOfArticles})</span>
        </div>
      </header>
      <ArticleList seriesName={seriesName} numOfArticles={numOfArticles} />
    </Suspense>
  );
};
