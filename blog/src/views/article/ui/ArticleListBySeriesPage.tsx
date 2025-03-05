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
    fetchNextPage
  } = useGetInfiniteArticleListBySeries(seriesName, numOfArticles);
  const oberserverRef = useObserver(() => fetchNextPage());

  return (
    <section className="media-padding-x flex min-h-screen flex-col">
      <header className="flex flex-col items-center justify-center">
        <p className="text-gray-500">시리즈별로 모아보기</p>
        <h1 className="text-bright-blue">{seriesName}</h1>
      </header>
      <main className="p-2">
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
      </main>
    </section>
  );
};
