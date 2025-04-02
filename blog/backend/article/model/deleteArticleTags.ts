import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const deleteArticleTags = async (articleId: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("article_tags")
    .delete()
    .eq("article_id", articleId);

  return error ? E.left(error) : E.right(data);
};
