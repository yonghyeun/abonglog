import { ArticleSlot } from "@/slots/[article]/ui";
import React from "react";

import { getArticleById } from "@/entities/article/model";

import { createBrowserSupabase } from "@/shared/model";

interface TempArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export async function generateStaticParams() {
  const supabase = createBrowserSupabase();

  const { data: ids } = await supabase
    .from("articles")
    .select("id")
    .eq("status", "published");

  return ids ? ids.map(({ id }) => ({ id })) : [];
}
export const dynamic = "force-static";
export const dynamicParams = false;

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
