"use server";

import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "../config";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 메모
 * 1. supabase 의 createClient 는 싱글톤 패턴으로 구현되어 있어 매번 호출해도
 *   같은 인스턴스를 반환한다.
 * 2. 클라이언트에서 cookieStore에 접근 가능하도록 options 객체에 cookie 객체를 추가해주도록 한다.
 * 그 이유는 기존 createClient (@supabase/js) 에선 세션 정보를 스토리지에 담았지만 , 서버 단에선 쿠키를 이용해
 * 세션을 관리하고자 한다.
 */
export const createServerSupabase = async () => {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      }
    },
    auth: {
      persistSession: false,
      autoRefreshToken: true
    }
  });
};
