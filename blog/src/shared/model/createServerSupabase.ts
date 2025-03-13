"use server";

import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "../config";
import type { Database } from "../model/database.types";
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
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /**
           * 해당 catch 문은 createServerSupabase 함수가 서버 컴포넌트에서 사용 될 경우 발생하는
           * 에러를 무시하기 위한 캐치문입니다.
           *
           * 기본적으로 NextJS 에서 cookieStore에 setCookie 동작은 서버 액션이나 라우트 핸들러에서만 사용 가능합니다.
           * 우리는 setCookie 동작을 하는 @supabase/ssr 을 사용하고 있기 때문에 서버 컴포넌트에서 사용할 경우
           * 에러가 발생하여 해당 에러를 무시 할 catch문을 추가해줍니다.
           */
        }
      }
    },
    auth: {
      persistSession: false,
      autoRefreshToken: true
    }
  });
};

export type ServerSupabase = Awaited<ReturnType<typeof createServerSupabase>>;
