import {
  ArticleListBySeriesSlot,
  EveryArticleListSlot
} from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

import {
  getArticleInfoPerSeries,
  getArticleList,
  getArticleListBySeries,
  getNumberOfArticles
} from "@/entities/article/model";

import {
  mergeDehydrateState,
  prefetchInfiniteQueryInServer,
  prefetchQueryInServer
} from "@/shared/model";

interface ArticleListPageProps {
  searchParams: Promise<{
    series?: string;
  }>;
}

const getArticleListState = async (series?: string) => {
  const state = await Promise.all([
    prefetchQueryInServer(() => getNumberOfArticles(series)),
    prefetchInfiniteQueryInServer(
      series === undefined
        ? () => getArticleList("published")
        : () => getArticleListBySeries("published", series)
    )
  ]);

  return mergeDehydrateState(...state);
};

const ArticleListPage: React.FC<ArticleListPageProps> = async ({
  searchParams
}) => {
  const { series } = await searchParams;

  // TODO 에러바운더리 도입하면 해당 쿼리문 제거하기
  const numOfSeriesArray = await getArticleInfoPerSeries().queryFn();

  const searchedSeries = numOfSeriesArray.find(
    (data) => data.seriesName === series
  );

  if (!searchedSeries && series) {
    // 찾는 시리즈가 없는 경우 404
    // TODO errorboundary 를 통해 404 페이지로 이동시키기
    return <NotFound series={series} />;
  }

  const articleListState = await getArticleListState(series);

  return (
    <HydrationBoundary state={articleListState}>
      <section className="media-padding-x flex min-h-screen flex-col">
        {series === undefined ? (
          <EveryArticleListSlot />
        ) : (
          <ArticleListBySeriesSlot seriesName={series} />
        )}
      </section>
    </HydrationBoundary>
  );
};

const NotFound: React.FC<{ series: string }> = ({ series }) => (
  <section className="media-padding-x flex min-h-screen flex-col">
    <section className="my-12 flex items-center justify-center">
      <p className="text-[10rem] text-gray-400">Σ(°ロ°)</p>
    </section>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>
        아쉽게도 입력하신 <span className="text-blue-700">{series}</span>는
        존재하지 않는 시리즈 이름입니다.
      </h1>
      <Link
        href="/"
        className="border border-blue-700 bg-blue-700 px-8 py-4 text-white"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  </section>
);

export default ArticleListPage;
