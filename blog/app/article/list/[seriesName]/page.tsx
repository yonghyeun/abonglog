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

// const NotFound: React.FC<{ series: string }> = ({ series }) => (
//   <section className="media-padding-x flex min-h-screen flex-col">
//     <section className="my-12 flex items-center justify-center">
//       <p className="text-[10rem] text-gray-400">Σ(°ロ°)</p>
//     </section>
//     <div className="flex flex-col items-center justify-center gap-4">
//       <h1>
//         아쉽게도 입력하신 <span className="text-blue-700">{series}</span>는
//         존재하지 않는 시리즈 이름입니다.
//       </h1>
//       <Link
//         href="/"
//         className="border border-blue-700 bg-blue-700 px-8 py-4 text-white"
//       >
//         메인 페이지로 돌아가기
//       </Link>
//     </div>
//   </section>
// );

export default ArticleListPage;
