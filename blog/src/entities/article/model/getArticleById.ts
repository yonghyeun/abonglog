import { rehypeMarkdown } from "../lib";

import { parsingHeading } from "@/features/article/lib";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getArticleById = async (
  articleId: string,
  status?: "published" | "draft"
) => {
  const supabase = createBrowserSupabase();

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
        id , title , author , 
        series_name , description , 
        status , updated_at, thumbnail_url,
        content, article_tags(tag_name)
      `
    )
    .eq("status", status || "published")
    .eq("id", +articleId)
    .single();

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
