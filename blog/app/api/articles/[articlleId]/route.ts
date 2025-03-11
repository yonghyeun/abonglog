import { NextRequest, NextResponse } from "next/server";

import { createServerSupabase } from "@/shared/model";
import { createPostgressErrorResponse } from "@/shared/route";

export const DELETE = async (req: NextRequest) => {
  const articleId = (await req).url.split("/").pop() || "";

  const supabase = await createServerSupabase();

  const response = await supabase
    .from("articles")
    .delete()
    .eq("id", +articleId);

  if (response.error) {
    return NextResponse.json(...createPostgressErrorResponse(response));
  }

  return NextResponse.json({ code: response.status, message: "success" });
};
