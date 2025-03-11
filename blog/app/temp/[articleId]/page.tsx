import React from "react";

import { AdminArticlePage } from "@/views/[article]/ui";

import { parsingHeading } from "@/features/article/lib";

import { rehypeMarkdown } from "@/entities/article/lib";
import { getArticleById } from "@/entities/article/model";

interface TempArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const TempArticlePage: React.FC<TempArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "draft");

  const html = await rehypeMarkdown(articleData.content);
  const headings = parsingHeading(articleData.content);

  return (
    <AdminArticlePage
      articleId={articleId}
      articleData={{
        ...articleData,
        headings,
        html
      }}
    />
  );
};

export default TempArticlePage;
