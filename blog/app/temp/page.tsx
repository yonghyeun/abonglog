import { TempArticleListSlot } from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  getArticleList,
  getNumberOfTempArticles
} from "@/entities/article/model";

import {
  mergeDehydrateState,
  prefetchInfiniteQueryInServer,
  prefetchQueryInServer
} from "@/shared/model";

const getTempArticleListState = async () => {
  const state = await Promise.all([
    prefetchInfiniteQueryInServer(() => getArticleList("draft")),
    prefetchQueryInServer(() => getNumberOfTempArticles())
  ]);

  return mergeDehydrateState(...state);
};

const TempArticleListPage = async () => {
  const tempArticleListState = await getTempArticleListState();

  return (
    <HydrationBoundary state={tempArticleListState}>
      <section className="media-padding-x flex min-h-screen flex-col">
        <TempArticleListSlot />
      </section>
    </HydrationBoundary>
  );
};

export default TempArticleListPage;
