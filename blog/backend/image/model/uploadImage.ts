import { createServerSupabase } from "@/shared/model";

export const uploadImage = async (
  storageName: string,
  url: string,
  image: File
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).upload(url, image);
};
