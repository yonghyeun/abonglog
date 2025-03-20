import { createServerSupabase } from "@/shared/model";

export const uploadImage = async (
  storageName: string,
  path: string,
  image: File
) => {
  const supabase = await createServerSupabase();

  return supabase.storage.from(storageName).upload(path, image);
};

type UploadMultipleImages = (
  images: { path: string; image: File }[],
  storageName: string
) => Promise<Awaited<ReturnType<typeof uploadImage>>[]>;

export const uploadMultipleImages: UploadMultipleImages = (
  images,
  stroageName
) => {
  return Promise.all(
    images.map(({ path, image }) => uploadImage(stroageName, path, image))
  );
};
