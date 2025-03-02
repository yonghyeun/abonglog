import { randomUUID } from "crypto";

import { createBrowserSupabase } from "@/shared/utils";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";

export const postArticleImage = async (file: File) => {
  const supabase = createBrowserSupabase();

  const imageId = randomUUID();
  const imageName = `${imageId}.${file.type.split("/")[1]}`;

  const { data, error } = await supabase.storage
    .from(ARTICLE_IMAGE_STORAGE_NAME)
    .upload(`public/${ARTICLE_IMAGE_STORAGE_NAME}/${imageName}`, file);

  if (error) {
    throw error;
  }

  return data;
};
