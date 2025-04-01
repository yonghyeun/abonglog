import { withEitherRequest } from "@backend/shared/lib";

import { createServerSupabase } from "@/shared/lib";

export const deleteArticleTags = withEitherRequest(
  async (articleId: number) => {
    const supabase = await createServerSupabase();

    return supabase.from("article_tags").delete().eq("article_id", articleId);
  }
);
