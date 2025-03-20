import type { ImageStorageName } from "./types";

import { createServerSupabase } from "@/shared/model";

export const deleteImages = async (
  storageName: ImageStorageName,
  urls: string[]
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).remove(urls);
};
