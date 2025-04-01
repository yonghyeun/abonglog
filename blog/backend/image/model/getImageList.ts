import type { ImageStorageName } from "./types";
import * as E from "@fp/either";

import { createServerSupabase } from "@/shared/lib";

export const getImageList = async (
  storageName: ImageStorageName,
  url: string
) => {
  const supabase = await createServerSupabase();
  const data = await supabase.storage.from(storageName).list(url);

  return data.error ? E.left(data.error) : E.right(data.data);
};
