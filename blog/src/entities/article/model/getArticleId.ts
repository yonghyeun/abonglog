import { ArticleStatus } from "./articleQueryKey";

import { createBrowserSupabase } from "@/shared/model";

export const getArticleId = async (status: ArticleStatus) => {
  const supabase = await createBrowserSupabase();

  const { data, error } = await supabase
    .from("articles")
    .select("id")
    .eq("status", status);

  if (error) {
    throw error;
  }

  return data;
};
