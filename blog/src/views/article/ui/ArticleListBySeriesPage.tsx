"use client";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { useGetInfiniteArticleListBySeries } from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

interface ArticleListBySeriesPageProps {
  seriesName: string;
  numOfArticles: number;
}

export const ArticleListBySeriesPage: React.FC<
  ArticleListBySeriesPageProps
> = ({ seriesName, numOfArticles }) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteArticleListBySeries(seriesName, numOfArticles);
  const observerRef = useObserver(() => fetchNextPage());

  return (
    <>
      {/* header */}
      <header className="flex flex-col items-center">
        <h3>시리즈별로 보기</h3>
        <div className="flex items-center gap-2">
          <h1 className="text-bright-blue">{seriesName}</h1>
          <span className="text-gray-500">({numOfArticles})</span>
        </div>
      </header>
      <section className="p-2">
        <Grid>
          {pages.map((article) => (
            <Grid.Item key={article.id}>
              <ArticlePreviewCard {...article} />
            </Grid.Item>
          ))}

          {/* loading Skeleton */}
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
        <div ref={observerRef} />
        {/* 모든 게시글을 가져오고 나면 */}
        {!hasNextPage && (
          <div className="flex items-center justify-center py-12 text-gray-400">
            {seriesName}의 모든 게시글을 가져왔습니다.
          </div>
        )}
      </section>
    </>
  );
};
