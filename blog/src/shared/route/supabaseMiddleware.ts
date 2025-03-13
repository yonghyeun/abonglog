import { type NextRequest, NextResponse } from "next/server";

import { createServerSupabase } from "@/shared/model";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request
  });

  /**
   * referechToken 을 자동 갱신하는 옵션을 설정해두었기 때문에
   * getUser 만 호출해도 자동으로 refreshToken 이 갱신된다.
   *
   * 만약 refreshToken 이 갱신되지 않는다면, refreshToken 이 만료되었을 가능성이 높다.
   * (supabase 에선 refreshToken을 사용하고나면 해당 referehsToken을 무효화 시킨다.
   * 실제 사용하며 refrehToken 이 만료되었을 경우는 두 개의 브라우저에서 동일한 refreshToken 을 들고 있다가
   * 다른 브라우저에서 해당 refreshToken을 사용한 경우일 것이다.
   * )
   */
  const supabase = await createServerSupabase();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
