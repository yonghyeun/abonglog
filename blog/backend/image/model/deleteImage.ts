import { createServerSupabase } from "@/shared/model";

export const deleteImages = async (storageName: string, urls: string[]) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).remove(urls);
};
