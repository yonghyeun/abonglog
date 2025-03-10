import { HydrationBoundary } from "@tanstack/react-query";

import { TempArticleListView } from "@/views/article/ui/TempArticleListView";

import {
  getArticleList,
  getNumberOfTempArticles
} from "@/entities/article/model";

import { prefetchInfiniteQueryInServer } from "@/shared/model";

const TempArticleListPage = async () => {
  const numOfArticles = await getNumberOfTempArticles();
  const tempArticleState = await prefetchInfiniteQueryInServer(() =>
    getArticleList("draft")
  );

  return (
    <HydrationBoundary state={tempArticleState}>
      <TempArticleListView numOfArticles={numOfArticles} />
    </HydrationBoundary>
  );
};

export default TempArticleListPage;
