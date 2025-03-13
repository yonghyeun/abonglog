import {
  ArticleListBySeriesSlot,
  EveryArticleListSlot
} from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  prefetchInfiniteQueryWithCache,
  prefetechQueryWithCache
} from "@/app/cache/lib";

import {
  getArticleList,
  getArticleListBySeries,
  getNumberOfArticles
} from "@/entities/article/model";
import { getSeriesList } from "@/entities/series/model";

interface ArticleListPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const data = await getSeriesList().queryFn();
  return [{ series: "all" }, ...data.map(({ name }) => ({ series: name }))];
}

export const dynamicParams = false;

const getArticleListState = async (series: string) => {
  const dehydrateStateArray = await Promise.all([
    prefetechQueryWithCache({
      callbacks: [() => getNumberOfArticles(series)]
    }),

    prefetchInfiniteQueryWithCache({
      callbacks: [
        series === "all"
          ? () => getArticleList("published")
          : () => getArticleListBySeries("published", series)
      ]
    })
  ]);

  return dehydrateStateArray.reduce((acc, cur) => ({
    mutations: [...acc.mutations, ...cur.mutations],
    queries: [...acc.queries, ...cur.queries]
  }));
};

const ArticleListPage: React.FC<ArticleListPageProps> = async ({ params }) => {
  const series = decodeURIComponent((await params).series);

  const articleListState = await getArticleListState(series);

  // 전체보기인 경우
  if (series === "all") {
    return (
      <HydrationBoundary state={articleListState}>
        <section className="media-padding-x flex min-h-screen flex-col">
          <EveryArticleListSlot />
        </section>
      </HydrationBoundary>
    );
  }

  return (
    <HydrationBoundary state={articleListState}>
      <section className="media-padding-x flex min-h-screen flex-col">
        <ArticleListBySeriesSlot seriesName={series} />
      </section>
    </HydrationBoundary>
  );

  // 찾는 시리즈가 없는 경우 404
  // TODO errorboundary 를 통해 404 페이지로 이동시키기
  // return <NotFound series={series} />;
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
