import type { ImageStorageName } from "./types";

import { createServerSupabase } from "@/shared/model";

export const getImageList = async (
  storageName: ImageStorageName,
  url: string
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).list(url);
};
