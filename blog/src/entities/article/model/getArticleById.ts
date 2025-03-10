import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getArticleById = async (articleId: string) => {
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
    .eq("status", "published")
    .eq("id", +articleId)
    .single();

  if (error) {
    throw error;
  }

  const { articleTags, ...articleData } = snakeToCamel(data);

  return {
    ...articleData,
    tags: articleTags.map(({ tagName }) => tagName!)
  };
};
