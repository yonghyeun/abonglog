import { rehypeMarkdown } from "../lib";

import { parsingHeading } from "@/features/article/lib";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

const ARTICLE_SELECT_FIELDS = `
  id , title , author , 
  series_name , description , 
  status , updated_at, thumbnail_url,
  content, article_tags(tag_name)
`;

const fetchArticleById = (
  articleId: number,
  status: "published" | "draft" | null
) => {
  const supabase = createBrowserSupabase();

  return status === null
    ? supabase
        .from("articles")
        .select(ARTICLE_SELECT_FIELDS)
        .eq("id", articleId)
        .single()
    : supabase
        .from("articles")
        .select(ARTICLE_SELECT_FIELDS)
        .eq("status", status)
        .eq("id", articleId)
        .single();
};

const transformArticleData = async <
  T extends { content: string; articleTags: { tagName: string | null }[] }
>({
  content,
  articleTags,
  ...data
}: T) => {
  const html = await rehypeMarkdown(content);
  const headings = parsingHeading(content);

  return {
    html,
    headings,
    tags: articleTags.map(({ tagName }) => tagName!),
    ...data
  };
};

export const getArticleById = async (
  articleId: string,
  status: "published" | "draft" | null
) => {
  const { data, error } = await fetchArticleById(Number(articleId), status);

  if (error) {
    throw error;
  }

  return transformArticleData(snakeToCamel(data));
};
