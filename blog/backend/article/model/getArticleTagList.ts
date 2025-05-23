import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const getArticleTagList = async (articleId: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("article_tags")
    .select("tag_name")
    .eq("article_id", articleId);

  return error ? E.left(error) : E.right(data);
};
