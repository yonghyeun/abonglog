import type { ImageStorageName } from "./types";
import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const getImageList = async (
  storageName: ImageStorageName,
  url: string
) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.storage.from(storageName).list(url);

  return error ? E.left(error) : E.right(data);
};
