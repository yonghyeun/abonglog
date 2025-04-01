import type { ImageStorageName } from "./types";
import { withEitherRequest } from "@backend/shared/lib";

import { createServerSupabase } from "@/shared/lib";

export const getImageList = withEitherRequest(
  async (storageName: ImageStorageName, url: string) => {
    const supabase = await createServerSupabase();
    return supabase.storage.from(storageName).list(url);
  }
);
