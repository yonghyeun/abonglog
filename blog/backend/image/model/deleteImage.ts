import type { ImageStorageName } from "./types";
import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const deleteImages = async (
  storageName: ImageStorageName,
  urls: string[]
) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.storage.from(storageName).remove(urls);

  return error ? E.left(error) : E.right(data);
};
