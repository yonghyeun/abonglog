import { TempArticleListSlot } from "@/slots/article/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  getArticleList,
  getNumberOfTempArticles
} from "@/entities/article/model";

import {
  prefetchInfiniteQueryInServer,
  prefetchQueryInServer
} from "@/shared/model";

const TempArticleListPage = async () => {
  const tempArticleState = await prefetchInfiniteQueryInServer(() =>
    getArticleList("draft")
  );

  const numOfArticlesState = await prefetchQueryInServer(() =>
    getNumberOfTempArticles()
  );

  return (
    <HydrationBoundary
      state={{
        ...tempArticleState,
        ...numOfArticlesState
      }}
    >
      <section className="media-padding-x flex min-h-screen flex-col">
        <TempArticleListSlot />
      </section>
    </HydrationBoundary>
  );
};

export default TempArticleListPage;
