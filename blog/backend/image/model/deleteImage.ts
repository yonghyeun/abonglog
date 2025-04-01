import type { ImageStorageName } from "./types";
import { withEitherRequest } from "@backend/shared/lib";

import { createServerSupabase } from "@/shared/lib";

export const deleteImages = withEitherRequest(
  async (storageName: ImageStorageName, urls: string[]) => {
    const supabase = await createServerSupabase();
    return supabase.storage.from(storageName).remove(urls);
  }
);
