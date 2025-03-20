import { createServerSupabase } from "@/shared/model";

export const getArticleTagList = async (articleId: number) => {
  const supabase = await createServerSupabase();

  return supabase
    .from("article_tags")
    .select("tag_name")
    .eq("article_id", articleId);
};
