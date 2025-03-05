"use client";

import React from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { useGetInfiniteArticleList } from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

interface EveryArticlePageProps {
  totalNumOfArticles: number;
}

export const EveryArticlePage: React.FC<EveryArticlePageProps> = ({
  totalNumOfArticles
}) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage
  } = useGetInfiniteArticleList(totalNumOfArticles);
  const oberserverRef = useObserver(() => fetchNextPage());

  return (
    <section className="media-padding-x flex min-h-screen flex-col">
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-bright-blue">전체 게시글 보기</h1>
          <span className="text-gray-500">({totalNumOfArticles})</span>
        </div>
      </header>
      <section className="p-2">
        <Grid>
          {pages.map((article) => (
            <Grid.Item key={article.id}>
              <ArticlePreviewCard {...article} />
            </Grid.Item>
          ))}

          {/* loading Skelecton */}
          {isFetchingNextPage &&
            Array(6)
              .fill(0)
              .map((_, idx) => (
                <Grid.Item key={idx}>
                  <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />
                </Grid.Item>
              ))}
        </Grid>
        {/* Infinite scroll observer */}
        <div ref={oberserverRef} />
      </section>
    </section>
  );
};
