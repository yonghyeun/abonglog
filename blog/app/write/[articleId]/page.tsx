import { ArticleWritePage } from "@/views/write/ui";

import { rehypeMarkdown } from "@/entities/article/lib";
import { getArticleById } from "@/entities/article/model";

interface ArticleEditPageProps {
  params: {
    articleId: string;
  };
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = async ({ params }) => {
  const { articleId } = await params;

  const articleData = await getArticleById(articleId);
  const html = await rehypeMarkdown(articleData.content);

  return (
    <ArticleWritePage
      articleId={+articleId}
      initialState={{
        ...articleData,
        html
      }}
    />
  );
};

export default ArticleEditPage;
