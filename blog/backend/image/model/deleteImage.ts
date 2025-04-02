import type { ImageStorageName } from "./types";
import * as E from "@fp/either";
import { when } from "@fxts/core";

import { createServerSupabase } from "@/shared/lib";

export const deleteImages = async (
  storageName: ImageStorageName,
  urls: string[]
) => {
  return when(
    () => urls.length > 0,
    async () => {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase.storage
        .from(storageName)
        .remove(urls);
      return error ? E.left(error) : E.right(data);
    },
    E.right([])
  );
};
