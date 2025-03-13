import { ArticleWriteSlot } from "@/slots/write/ui";

import { getArticleById } from "@/entities/article/model";

interface ArticleEditPageProps {
  params: Promise<{
    articleId: string;
  }>;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = async ({ params }) => {
  const { articleId } = await params;

  const articleData = await getArticleById(articleId, null);

  return (
    <ArticleWriteSlot
      articleId={+articleId}
      initialState={{
        ...articleData
      }}
    />
  );
};

export default ArticleEditPage;
