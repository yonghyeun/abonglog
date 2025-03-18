import { createServerSupabase } from "@/shared/model";

export const uploadImage = async (
  storageName: string,
  uri: string,
  image: File
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).upload(uri, image);
};
