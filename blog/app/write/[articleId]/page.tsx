import { ArticleWriteSlot } from "@/slots/write/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { getArticleById } from "@/entities/article/model";
import { getSeriesList } from "@/entities/series/model";
import { getTagList } from "@/entities/tag/model";

import { prefetchQueryInServer } from "@/shared/model";

interface ArticleEditPageProps {
  params: Promise<{
    articleId: string;
  }>;
}

const getArticleEditState = (articleId: string) => {
  return Promise.all([
    getArticleById(articleId, null),
    prefetchQueryInServer(getTagList, getSeriesList)
  ]);
};

const ArticleEditPage: React.FC<ArticleEditPageProps> = async ({ params }) => {
  const { articleId } = await params;
  const [articleData, articleWriteState] = await getArticleEditState(articleId);

  return (
    <HydrationBoundary state={articleWriteState}>
      <Suspense>
        <ArticleWriteSlot
          articleId={+articleId}
          initialState={{
            ...articleData
          }}
        />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ArticleEditPage;
