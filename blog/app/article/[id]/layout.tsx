import { AdminArticleHeader } from "@/slots/[article]/ui/AdminArticleHeader";

import { getAuthorizedUser } from "@/entities/user/model";

interface ArticleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = async ({
  children,
  params
}) => {
  const { id } = await params;

  const {
    data: { user }
  } = await getAuthorizedUser();

  return (
    <>
      {user && <AdminArticleHeader articleId={id} />}
      {children}
    </>
  );
};

export default ArticleLayout;
