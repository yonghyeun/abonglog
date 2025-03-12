import { AdminArticleSlot } from "@/slots/[article]/ui";
import React from "react";

import { getArticleById, getArticleId } from "@/entities/article/model";

interface TempArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getArticleId("draft");
  return ids.map(({ id }) => ({ id: String(id) }));
}

export const dynamicParams = false;

const TempArticlePage: React.FC<TempArticlePageProps> = async ({ params }) => {
  const { id } = await params;
  const articleData = await getArticleById(id, "draft");

  return (
    <AdminArticleSlot
      articleId={id}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default TempArticlePage;
