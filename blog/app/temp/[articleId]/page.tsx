import React from "react";

import { AdminArticlePage } from "@/views/[article]/ui";

import { getArticleById } from "@/entities/article/model";

interface TempArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const TempArticlePage: React.FC<TempArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "draft");

  return (
    <AdminArticlePage
      articleId={articleId}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default TempArticlePage;
