import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const upsertArticleTags = async (articleId: number, tags: string[]) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("article_tags").upsert(
    tags.map((tag) => ({
      article_id: articleId,
      tag_name: tag
    }))
  );

  return error ? E.left(error) : E.right(data);
};
