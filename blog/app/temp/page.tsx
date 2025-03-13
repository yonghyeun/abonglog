import { TempArticleListSlot } from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  prefetchInfiniteQueryWithCache,
  prefetechQueryWithCache
} from "@/app/cache/lib";

import {
  getArticleList,
  getNumberOfTempArticles
} from "@/entities/article/model";

const getTempArticleListState = async () => {
  const dehydrateStateArray = await Promise.all([
    prefetchInfiniteQueryWithCache({
      callbacks: [() => getArticleList("draft")]
    }),
    prefetechQueryWithCache({
      callbacks: [getNumberOfTempArticles]
    })
  ]);

  return dehydrateStateArray.reduce((acc, cur) => ({
    mutations: [...acc.mutations, ...cur.mutations],
    queries: [...acc.queries, ...cur.queries]
  }));
};

const TempArticleListPage = async () => {
  const tempArticleState = await getTempArticleListState();

  return (
    <HydrationBoundary state={tempArticleState}>
      <section className="media-padding-x flex min-h-screen flex-col">
        <TempArticleListSlot />
      </section>
    </HydrationBoundary>
  );
};

export default TempArticleListPage;
