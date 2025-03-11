import { HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

import {
  ArticleListBySeriesPage,
  EveryArticleListPage
} from "@/views/article/ui";

import {
  getArticleInfoPerSeries,
  getArticleList,
  getArticleListBySeries,
  getNumberOfArticles
} from "@/entities/article/model";

import {
  prefetchInfiniteQueryInServer,
  prefetchQueryInServer
} from "@/shared/model";

interface ArticleListPageProps {
  searchParams: {
    series?: string;
  };
}

const ArticleListPage: React.FC<ArticleListPageProps> = async ({
  searchParams
}) => {
  const { series } = await searchParams;

  // TODO 에러바운더리 도입하면 해당 쿼리문 제거하기
  const numOfSeriesArray = await getArticleInfoPerSeries().queryFn();

  const numOfArticlesState = await prefetchQueryInServer(() =>
    getNumberOfArticles(series)
  );

  const searchedSeries = numOfSeriesArray.find(
    (data) => data.seriesName === series
  );

  // 전체보기인 경우
  if (series === undefined) {
    const articleListState = await prefetchInfiniteQueryInServer(() =>
      getArticleList("published")
    );

    return (
      <HydrationBoundary
        state={{
          ...articleListState,
          ...numOfArticlesState
        }}
      >
        <section className="media-padding-x flex min-h-screen flex-col">
          <EveryArticleListPage />
        </section>
      </HydrationBoundary>
    );
  }

  // 시리즈 별로 모아보기인 경우
  if (searchedSeries) {
    const articleListState = await prefetchInfiniteQueryInServer(() =>
      getArticleListBySeries("published", series)
    );

    return (
      <HydrationBoundary
        state={{
          ...articleListState,
          ...numOfArticlesState
        }}
      >
        <section className="media-padding-x flex min-h-screen flex-col">
          <ArticleListBySeriesPage seriesName={series} />
        </section>
      </HydrationBoundary>
    );
  }

  // 찾는 시리즈가 없는 경우 404
  // TODO errorboundary 를 통해 404 페이지로 이동시키기
  return <NotFound series={series} />;
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
