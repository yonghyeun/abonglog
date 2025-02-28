import { Database } from "@/shared/model/database.types";
import { createBrowserSupabase } from "@/shared/utils";

export type Tag = Database["public"]["Tables"]["tags"]["Row"];

export const getTags = async () => {
  const supabase = createBrowserSupabase();
  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    throw error;
  }

  return data;
};
