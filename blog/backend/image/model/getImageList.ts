import type { ImageStorageName } from "./types";

import { createServerSupabase } from "@/shared/lib";

export const getImageList = async (
  storageName: ImageStorageName,
  url: string
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).list(url);
};
