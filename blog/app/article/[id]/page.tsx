import { GuestArticleSlot } from "@/slots/[article]/ui";

import { getArticleById, getArticleId } from "@/entities/article/model";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getArticleId("published");

  console.log("generateStaticParams", ids);

  return ids.map(({ id }) => ({ id: String(id) }));
}

export const dynamicParams = false;

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { id } = await params;
  const articleData = await getArticleById(id, "published");

  console.log("funcking im re rendered");

  return (
    <GuestArticleSlot
      articleId={id}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default ArticlePage;
