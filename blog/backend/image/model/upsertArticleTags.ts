import { withEitherRequest } from "@backend/shared/lib";

import { createServerSupabase } from "@/shared/lib";

export const upsertArticleTags = withEitherRequest(
  async (articleId: number, tags: string[]) => {
    const supabase = await createServerSupabase();
    return supabase.from("article_tags").upsert(
      tags.map((tag) => ({
        article_id: articleId,
        tag_name: tag
      }))
    );
  }
);
