import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const deleteArticleTags = async (articleId: number, tags?: string[]) => {
  const supabase = await createServerSupabase();

  const query = supabase
    .from("article_tags")
    .delete()
    .eq("article_id", articleId);

  if (tags) {
    query.in("tag_name", tags);
  }

  const { data, error } = await query;

  return error ? E.left(error) : E.right(data);
};
