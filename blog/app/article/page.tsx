import { HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

import { prefetchArticleList } from "@/views/article/model";
import {
  ArticleListBySeriesPage,
  EveryArticleListPage
} from "@/views/article/ui";

import { getSeriesList } from "@/entities/series/model";

interface ArticleListPageProps {
  searchParams: {
    series?: string;
  };
}

const ArticleListPage: React.FC<ArticleListPageProps> = async ({
  searchParams
}) => {
  const { series } = await searchParams;
  const numOfSeriesArray = await getSeriesList().queryFn();

  const searchedSeries = numOfSeriesArray.find(
    (data) => data.seriesName === series
  );

  // 전체보기인 경우
  if (series === undefined) {
    const state = await prefetchArticleList("published");
    const totalNumOfArticles = numOfSeriesArray.reduce(
      (acc, cur) => acc + cur["numOfArticles"],
      0
    );

    return (
      <HydrationBoundary state={state}>
        <EveryArticleListPage numOfArticles={totalNumOfArticles} />
      </HydrationBoundary>
    );
  }

  // 시리즈 별로 모아보기인 경우
  if (searchedSeries) {
    const state = await prefetchArticleList("published", series);
    const numOfArticles = searchedSeries["numOfArticles"];

    return (
      <HydrationBoundary state={state}>
        <ArticleListBySeriesPage
          seriesName={series}
          numOfArticles={numOfArticles}
        />
      </HydrationBoundary>
    );
  }

  // 찾는 시리즈가 없는 경우 404

  return <NotFound series={series} />;
};

const NotFound: React.FC<{ series: string }> = ({ series }) => (
  <section className="media-padding-x flex min-h-screen flex-col">
    <section className="my-12 flex items-center justify-center">
      <p className="text-[10rem] text-gray-400">Σ(°ロ°)</p>
    </section>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>
        아쉽게도 입력하신 <span className="text-bright-blue">{series}</span>는
        존재하지 않는 시리즈 이름입니다.
      </h1>
      <Link
        href="/"
        className="rounded-xl border border-sky-blue bg-sky-blue px-8 py-4 text-white"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  </section>
);

export default ArticleListPage;
