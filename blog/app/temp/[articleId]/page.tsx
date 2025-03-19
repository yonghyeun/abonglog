import { ArticleSlot } from "@/slots/[article]/ui";
import React from "react";

import { getArticleById } from "@/entities/article/model";

interface TempArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const TempArticlePage: React.FC<TempArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "draft");

  return (
    <ArticleSlot
      articleId={articleId}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default TempArticlePage;
