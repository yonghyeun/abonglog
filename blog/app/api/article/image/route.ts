import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";

import { createServerSupabase } from "@/shared/utils";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";

const uploadImageAction = async (file: File, postId: string) => {
  const supabase = await createServerSupabase();

  const imageId = randomUUID();
  const imageName = `${imageId}.${file.type.split("/")[1]}`;

  const { data, error } = await supabase.storage
    .from(ARTICLE_IMAGE_STORAGE_NAME)
    .upload(`public/${postId}/${imageName}`, file);

  if (error) {
    throw error;
  }

  return data;
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const images = formData.getAll("image") as File[];
    const postId = formData.get("id") as string;
    const imageUrls = await Promise.all(
      images.map((file) => uploadImageAction(file, postId))
    );

    return NextResponse.json({
      status: 200,
      messag: "success",
      data: imageUrls
    });
  } catch (error) {
    console.log(error);

    const typedError = error as { statusCode?: number; message?: string };

    return NextResponse.json(
      {
        status: typedError.statusCode || 500,
        data: typedError.message || "예기치 못한 에러가 발생 했습니다."
      },
      {
        status: typedError.statusCode || 500
      }
    );
  }
};
