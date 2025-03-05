"use client";

import React from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { useGetInfiniteArticleList } from "@/entities/article/model";

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

  const articles = pages.flatMap((page) => page.data);

  return (
    <section className="media-padding-x flex min-h-screen flex-col">
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-bright-blue">전체 게시글 보기</h1>
          <span className="text-gray-500">({totalNumOfArticles})</span>
        </div>
      </header>
      <section className="border">
        <button onClick={fetchNextPage}>fetch</button>
        <Grid>
          {articles.map((article, idx) => (
            <Grid.Item key={idx}>
              <ArticlePreviewCard {...article} />
            </Grid.Item>
          ))}
        </Grid>
      </section>
    </section>
  );
};
