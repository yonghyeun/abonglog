import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import React, { Suspense } from "react";

import { ArticleWritePage } from "@/views/ui/ArticleWritePage";

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

  // TODO ISR 시 아티클 아이디 생성하기
  const randomArticleId = Math.floor(Math.random() * 10 ** 7).toString();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={"loading..."}>
        <ArticleWritePage articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
