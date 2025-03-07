import { getArticleById } from "@/entities/article/model";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;

  const { thumbnailUrl, tags, title, author, updatedAt, seriesName } =
    await getArticleById(articleId);

  return <div>hi</div>;
};

export default ArticlePage;
