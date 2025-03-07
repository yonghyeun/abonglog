import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

import { ArticleWritePage } from "@/views/write/ui";

import { getSeriesList } from "@/entities/series/model";
import { getTagList } from "@/entities/tag/model";

import { prefetchQueryInServer } from "@/shared/model";

const WritePage = async () => {
  const articleWriteState = prefetchQueryInServer(getTagList, getSeriesList);

  // TODO ISR 시 아티클 아이디 생성하기
  const randomArticleId = Math.floor(Math.random() * 10 ** 7);

  return (
    <HydrationBoundary state={articleWriteState}>
      <Suspense fallback={"loading..."}>
        <ArticleWritePage articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
