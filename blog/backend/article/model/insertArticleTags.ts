import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

interface ArticleTags {
  tag_name: string;
  article_id: number;
}

export const insertArticleTags = async (
  articleId: number,
  tags: ArticleTags
) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("article_tags")
    .insert({
      tag_name: tags.tag_name,
      article_id: articleId
    })
    .select();

  return error ? E.left(error) : E.right(data);
};
