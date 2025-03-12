import { AdminArticleSlot, GuestArticleSlot } from "@/slots/[article]/ui";

import { getArticleById, getArticleId } from "@/entities/article/model";
import { getAuthorizedUser } from "@/entities/user/model";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getArticleId("published");

  return ids.map(({ id }) => ({ id: String(id) }));
}

export const dynamicParams = false;

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { id } = await params;
  const articleData = await getArticleById(id, "published");

  const {
    data: { user }
  } = await getAuthorizedUser();

  if (user) {
    return (
      <AdminArticleSlot
        articleId={id}
        articleData={{
          ...articleData
        }}
      />
    );
  }

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
