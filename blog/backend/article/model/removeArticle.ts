import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const removeArticle = async (articleId: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);

  return error ? E.left(error) : E.right(data);
};
