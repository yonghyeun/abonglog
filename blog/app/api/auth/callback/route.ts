import { NextRequest, NextResponse } from "next/server";

import { HOST_EMAIL } from "@/shared/config";
import { createServerSupabase } from "@/shared/lib";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // 인증 코드가 존재하지 않는 경우
  // 일반적인 요청시엔 인증 코드가 필연적으로 존재한다.
  if (!code) {
    return NextResponse.redirect(url.origin);
  }

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  const { session, user } = data;

  // 로그인을 시도한 사람이 관리자가 아닌 경우 401 에러 페이지로 리다이렉트
  if (error || !user || user.email !== HOST_EMAIL) {
    // TOOD : 쿠키 제거하기
    return NextResponse.redirect(`${url.origin}/error/401`);
  }

  return NextResponse.redirect(url.origin);
};
