import { ImageStorageName } from "./types";

import { createServerSupabase } from "@/shared/lib";

export const downloadImage = async (
  storageName: ImageStorageName,
  path: string
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).download(path);
};
