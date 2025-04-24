import {
  ArticleListBySeriesSlot,
  EveryArticleListSlot
} from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  getArticleList,
  getArticleListBySeries,
  getNumberOfArticles
} from "@/entities/article/model";
import { getSeriesList } from "@/entities/series/model";

import { mergeDehydrateState } from "@/shared/lib";
import {
  prefetchInfiniteQueryInServer,
  prefetchQueryInServer
} from "@/shared/model";

interface ArticleListPageProps {
  params: Promise<{
    seriesName?: string;
  }>;
}

const getArticleListState = async (series: string) => {
  const state = await Promise.all([
    prefetchQueryInServer(() => getNumberOfArticles(series)),
    prefetchInfiniteQueryInServer(
      series === "all"
        ? () => getArticleList("published")
        : () => getArticleListBySeries("published", series)
    )
  ]);

  return mergeDehydrateState(...state);
};

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const seriesList = await getSeriesList()
    .queryFn()
    .then((data) => data.map(({ name }) => name));

  return ["all", ...seriesList].map((seriesName) => ({ seriesName }));
}

const ArticleListPage: React.FC<ArticleListPageProps> = async ({ params }) => {
  const seriesName = decodeURIComponent((await params).seriesName || "all");

  const articleListState = await getArticleListState(seriesName);

  return (
    <HydrationBoundary state={articleListState}>
      <section className="media-padding-x flex min-h-screen flex-col">
        {seriesName === "all" ? (
          <EveryArticleListSlot />
        ) : (
          <ArticleListBySeriesSlot seriesName={seriesName} />
        )}
      </section>
    </HydrationBoundary>
  );
};

export default ArticleListPage;
