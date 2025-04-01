import { camelToSnake, withEitherRequest } from "@backend/shared/lib";

import { PostNewArticleRequest } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/lib";

export const upsertNewArticle = withEitherRequest(
  async (articleData: Omit<PostNewArticleRequest, "tags">) => {
    const supabase = await createServerSupabase();
    const currentTimeStamp = new Date().toISOString();

    return supabase.from("articles").upsert({
      ...camelToSnake(articleData),
      created_at: currentTimeStamp,
      updated_at: currentTimeStamp
    });
  }
);
