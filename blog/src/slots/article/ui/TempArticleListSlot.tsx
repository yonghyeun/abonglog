"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import {
  useGetInfiniteArticleList,
  useGetNumberOfTempArticles
} from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

const ArticleList = ({ numOfArticles }: { numOfArticles: number }) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteArticleList("draft", numOfArticles);

  const observerRef = useObserver(() => fetchNextPage());

  return (
    <>
      <section className="p-2">
        <Grid>
          {pages.map((article) => (
            <Grid.Item key={article.id}>
              <Link href={`/temp/${article.id}`}>
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
            모든 임시 저장된 게시글을 가져왔습니다.
          </div>
        )}
      </section>
    </>
  );
};

export const TempArticleListSlot = () => {
  const { data: numOfArticles } = useGetNumberOfTempArticles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-blue-500">임시 저장된 모든 게시글 보기</h1>
          <span className="text-secondary">({numOfArticles})</span>
        </div>
      </header>
      <ArticleList numOfArticles={numOfArticles} />
    </Suspense>
  );
};
