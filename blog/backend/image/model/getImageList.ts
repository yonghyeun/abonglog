import { createServerSupabase } from "@/shared/model";

export const getImageList = async (storageName: string, url: string) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).list(url);
};
