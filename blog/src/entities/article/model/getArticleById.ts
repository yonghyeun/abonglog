import { parsingHeadings, rehypeMarkdown } from "../lib";
import { extractTagName } from "./utils";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

const ARTICLE_SELECT_FIELDS = `
  id , title , author , 
  series_name , description , 
  status , created_at, thumbnail_url,
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
>(
  data: T
) => {
  const html = await rehypeMarkdown(data.content);
  const headings = parsingHeadings(data.content);

  return {
    html,
    headings,
    tags: extractTagName(data.articleTags),
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
