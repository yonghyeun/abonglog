import { rehypeMarkdown } from "../lib";

import { parsingHeading } from "@/features/article/lib";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getArticleById = async (
  articleId: string,
  status: "published" | "draft" | null
) => {
  const supabase = createBrowserSupabase();

  let selectArticleByIdResponse;

  if (status === null) {
    selectArticleByIdResponse = await supabase
      .from("articles")
      .select(
        `
        id , title , author , 
        series_name , description , 
        status , updated_at, thumbnail_url,
        content, article_tags(tag_name)
      `
      )
      .eq("id", +articleId)
      .single();
  } else {
    selectArticleByIdResponse = await supabase
      .from("articles")
      .select(
        `
        id , title , author , 
        series_name , description , 
        status , updated_at, thumbnail_url,
        content, article_tags(tag_name)
      `
      )
      .eq("status", status)
      .eq("id", +articleId)
      .single();
  }

  const { data, error } = selectArticleByIdResponse;

  if (error) {
    throw error;
  }

  const { articleTags, ...articleData } = snakeToCamel(data);

  const html = await rehypeMarkdown(articleData.content);
  const headings = parsingHeading(articleData.content);

  return {
    ...articleData,
    headings,
    html,
    tags: articleTags.map(({ tagName }) => tagName!)
  };
};
