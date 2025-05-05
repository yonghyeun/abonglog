import { camelToSnake } from "@backend/shared/lib";
import * as E from "@fp/either";

import { PostNewArticleRequest } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/lib";

export const upsertArticle = async (
  articleData: Omit<PostNewArticleRequest, "tags" | "immutable">
) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.from("articles").upsert({
    ...camelToSnake(articleData)
  });

  return error ? E.left(error) : E.right(data);
};
