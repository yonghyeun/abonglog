import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import Link from "next/link";

import { ArticleListBySeriesPage, EveryArticlePage } from "@/views/article/ui";

import { getArticleList } from "@/entities/article/model";
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
  const numOfSereisArray = await getSeriesList().queryFn();

  // 전체보기인 경우
  if (series === undefined) {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery(getArticleList());

    const numOfArticles = numOfSereisArray.reduce(
      (acc, cur) => acc + cur["numOfArticles"],
      0
    );

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EveryArticlePage numOfArticles={numOfArticles} />
      </HydrationBoundary>
    );
  }

  // 시리즈 별로 모아보기인 경우

  const searchedSeries = numOfSereisArray.find(
    (data) => data.seriesName === series
  );

  // 검색한 시리즈가 있는 경우
  if (searchedSeries) {
    const numOfArticles = searchedSeries["numOfArticles"];
    const queryClient = new QueryClient();

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticleListBySeriesPage
          seriesName={series}
          numOfArticles={numOfArticles}
        />
      </HydrationBoundary>
    );
  }

  // 찾는 시리즈가 없는 경우 404

  return (
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
};

export default ArticleListPage;
