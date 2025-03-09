import { AdminArticlePage, GuestArticlePage } from "@/views/[article]/ui";

import { parsingHeading } from "@/features/article/lib/createNestedHeadings";

import { rehypeMarkdown } from "@/entities/article/lib";
import { getArticleById } from "@/entities/article/model";
import { getAuthorizedUser } from "@/entities/user/model";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;
  const articleData = await getArticleById(articleId);

  const html = await rehypeMarkdown(articleData.content);
  const headings = parsingHeading(articleData.content);
  const {
    data: { user }
  } = await getAuthorizedUser();

  if (user) {
    return (
      <AdminArticlePage
        articleId={articleId}
        articleData={{
          ...articleData,
          headings,
          html
        }}
      />
    );
  }

  return (
    <GuestArticlePage
      articleId={articleId}
      articleData={{
        ...articleData,
        headings,
        html
      }}
    />
  );
};

export default ArticlePage;
