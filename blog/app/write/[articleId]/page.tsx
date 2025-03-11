import { ArticleWritePage } from "@/views/write/ui";

import { getArticleById } from "@/entities/article/model";

interface ArticleEditPageProps {
  params: {
    articleId: string;
  };
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = async ({ params }) => {
  const { articleId } = await params;

  const articleData = await getArticleById(articleId);

  return (
    <ArticleWritePage
      articleId={+articleId}
      initialState={{
        ...articleData
      }}
    />
  );
};

export default ArticleEditPage;
