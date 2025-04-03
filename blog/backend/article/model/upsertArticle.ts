import { camelToSnake } from "@backend/shared/lib";
import * as E from "@fp/either";

import { PostNewArticleRequest } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/lib";

export const upsertArticle = async (
  articleData: Omit<PostNewArticleRequest, "tags">
) => {
  const supabase = await createServerSupabase();
  const currentTimeStamp = new Date().toISOString();

  const { data, error } = await supabase.from("articles").upsert({
    ...camelToSnake(articleData),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });

  return error ? E.left(error) : E.right(data);
};
