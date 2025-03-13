"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import {
  useGetInfiniteArticleList,
  useGetNumberOfArticles
} from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

const EveryArticleList = ({ numOfArticles }: { numOfArticles: number }) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteArticleList("published", numOfArticles);

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
            모든 게시글을 가져왔습니다.
          </div>
        )}
      </section>
    </>
  );
};

export const EveryArticleListSlot = () => {
  const { data: numOfArticles } = useGetNumberOfArticles("all");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-blue-900">전체 게시글 보기</h1>
          <span className="text-gray-500">({numOfArticles})</span>
        </div>
      </header>
      <EveryArticleList numOfArticles={numOfArticles} />
    </Suspense>
  );
};
