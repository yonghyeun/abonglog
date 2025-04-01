import { withEitherRequest } from "@backend/shared/lib";

import { createServerSupabase } from "@/shared/lib";

export const getArticleTagList = withEitherRequest(
  async (articleId: number) => {
    const supabase = await createServerSupabase();

    return supabase
      .from("article_tags")
      .select("tag_name")
      .eq("article_id", articleId);
  }
);
