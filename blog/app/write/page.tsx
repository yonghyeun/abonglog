import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import React, { Suspense } from "react";

import { ArticleWriteWidget } from "@/widgets/article/ui";

import { getSeries, seriesQueryKey } from "@/entities/series/model";
import { getTags, tagQueryKey } from "@/entities/tag/model";

const WritePage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: tagQueryKey.default,
      queryFn: getTags
    }),
    queryClient.prefetchQuery({
      queryKey: seriesQueryKey.default,
      queryFn: getSeries
    })
  ]);

  const randomArticleId = Math.floor(Math.random() * 10 ** 7).toString();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={"loading..."}>
        <ArticleWriteWidget articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
