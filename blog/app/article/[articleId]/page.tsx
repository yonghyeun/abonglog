import { ArticleSlot } from "@/slots/[article]/ui";

import { getArticleById } from "@/entities/article/model";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "published");

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
