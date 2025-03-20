import { ArticleSlot } from "@/slots/[article]/ui";

import { getArticleById } from "@/entities/article/model";

import { createBrowserSupabase } from "@/shared/model";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createBrowserSupabase();

  const { data: ids } = await supabase
    .from("articles")
    .select("id")
    .eq("status", "published");

  return ids ? ids.map(({ id }) => ({ articleId: String(id) })) : [];
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "published");

  console.log("fucking im rerener");

  return (
    <ArticleSlot
      articleId={articleId}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default ArticlePage;
