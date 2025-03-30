import { defaultMetadata } from "@/app";
import { ArticleSlot } from "@/slots/[article]/ui";
import { Metadata } from "next";

import { getArticleById } from "@/entities/article/model";

import { createBrowserSupabase } from "@/shared/lib";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const supabase = createBrowserSupabase();

  const { data: ids } = await supabase
    .from("articles")
    .select("id")
    .eq("status", "published");

  return ids ? ids.map(({ id }) => ({ articleId: String(id) })) : [];
}

export async function generateMetadata({
  params
}: ArticlePageProps): Promise<Metadata> {
  const { articleId } = await params;
  const { title, description, thumbnailUrl, tags } = await getArticleById(
    articleId,
    "published"
  );

  return {
    ...defaultMetadata,
    keywords: tags,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      type: "article",
      title,
      description,
      images: [
        {
          url: thumbnailUrl!,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/webp"
        }
      ]
    }
  };
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
