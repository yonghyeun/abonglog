import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";

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

    const totalNumOfArticles = numOfSereisArray.reduce(
      (acc, cur) => acc + cur["numOfArticles"],
      0
    );

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EveryArticlePage totalNumOfArticles={totalNumOfArticles} />
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
};

export default ArticleListPage;
