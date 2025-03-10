"use client";

import Link from "next/link";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { useGetInfiniteArticleList } from "@/entities/article/model";

import { useObserver } from "@/shared/lib";
import { Grid } from "@/shared/ui/Grid";

interface TempArticleListViewProps {
  numOfArticles: number;
}

export const TempArticleListView: React.FC<TempArticleListViewProps> = ({
  numOfArticles
}) => {
  const {
    data: { pages },
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteArticleList("draft", numOfArticles);

  const observerRef = useObserver(() => fetchNextPage());

  return (
    <>
      {/* header */}
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-blue-900">임시 저장된 모든 게시글 보기</h1>
          <span className="text-gray-500">({numOfArticles})</span>
        </div>
      </header>
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
        <div ref={observerRef} />
        {/* 모든 게시글을 가져오고 나면 */}
        {!hasNextPage && (
          <div className="flex items-center justify-center py-12 text-gray-400">
            모든 임시 저장된 게시글을 가져왔습니다.
          </div>
        )}
      </section>
    </>
  );
};
