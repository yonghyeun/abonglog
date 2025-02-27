import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { HOST_EMAIL } from "@/shared/config";
import { createServerSupabase } from "@/shared/utils";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(url.origin);
  }

  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  const { user } = data;

  if (error) {
    // TODO 적합한 에러 페이지 생성하기
    redirect(`/error/${error.code}`);
  }

  if (!user) {
    // TODO 적합한 에러 페이지 생성하기
    redirect(`/error/401`);
  }

  if (user.email !== HOST_EMAIL) {
    await Promise.all([
      supabase.auth.admin.deleteUser(user.id),
      supabase.auth.signOut()
    ]);

    // TODO 사용자 에러 페이지로 적합하게 리다이렉션 하기
    return NextResponse.redirect(url.origin);
  }

  return NextResponse.redirect(url.origin);
};
