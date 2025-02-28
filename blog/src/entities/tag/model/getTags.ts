import { createBrowserSupabase } from "@/shared/utils";

export const getTags = async () => {
  const supabase = createBrowserSupabase();
  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    throw error;
  }

  return data;
};
