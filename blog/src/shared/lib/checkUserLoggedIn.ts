import { createServerSupabase } from "../utils";

export const checkUserLoggedIn = async () => {
  const supabase = await createServerSupabase();
  // 호출 시 네트워크 요청에 존재하는 토큰 정보를 이용해
  // supabase auth database 조회
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  return {
    isLoggedIn: !!user,
    user,
    error
  };
};
