import { camelToSnake } from "@backend/shared/lib";

import type { PostNewArticleRequest } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/lib";

export const upsertArticle = async (
  newArticle: Omit<PostNewArticleRequest, "tags">
) => {
  const supabase = await createServerSupabase();
  const currentTimeStamp = new Date().toISOString();

  return supabase.from("articles").upsert({
    ...camelToSnake(newArticle),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });
};
