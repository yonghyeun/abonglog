import { AdminArticleSlot, GuestArticleSlot } from "@/slots/[article]/ui";

import { getArticleById } from "@/entities/article/model";
import { getAuthorizedUser } from "@/entities/user/model";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId, "published");

  const {
    data: { user }
  } = await getAuthorizedUser();

  if (user) {
    return (
      <AdminArticleSlot
        articleId={articleId}
        articleData={{
          ...articleData
        }}
      />
    );
  }

  return (
    <GuestArticleSlot
      articleId={articleId}
      articleData={{
        ...articleData
      }}
    />
  );
};

export default ArticlePage;
