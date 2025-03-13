import { ArticleWriteSlot } from "@/slots/write/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

import { getSeriesList } from "@/entities/series/model";
import { getTagList } from "@/entities/tag/model";

import { prefetchQueryInServer } from "@/shared/model";

const WritePage = async () => {
  const articleWriteState = await prefetchQueryInServer(
    getTagList,
    getSeriesList
  );

  // TODO ISR 시 아티클 아이디 생성하기
  const randomArticleId = Math.floor(Math.random() * 10 ** 7);

  return (
    <HydrationBoundary state={articleWriteState}>
      <Suspense fallback={"loading..."}>
        <ArticleWriteSlot articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
