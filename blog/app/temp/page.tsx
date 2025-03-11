import { HydrationBoundary } from "@tanstack/react-query";

import { TempArticleListView } from "@/views/article/ui/TempArticleListView";

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
        <TempArticleListView />
      </section>
    </HydrationBoundary>
  );
};

export default TempArticleListPage;
