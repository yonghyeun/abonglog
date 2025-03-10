import { createServerSupabase } from "@/shared/model";

export const getNumberOfArticles = async (series?: string) => {
  const supabase = await createServerSupabase();

  // 전체 보기인 경우

  if (series === undefined) {
    const { count, error } = await supabase
      .from("articles")
      .select("id", { count: "exact" })
      .eq("status", "published");

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  // 특정 시리즈가 존재하는 경우

  const { count, error } = await supabase
    .from("articles")
    .select("id", { count: "exact" })
    .eq("status", "published")
    .eq("series_name", series);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
};

export const getNumberOfTempArticles = async () => {
  const supabase = await createServerSupabase();

  const { count, error } = await supabase
    .from("articles")
    .select("id", { count: "exact" })
    .eq("status", "draft");

  if (error) {
    throw error;
  }

  return count ?? 0;
};
