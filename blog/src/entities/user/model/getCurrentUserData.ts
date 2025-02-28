import { createServerSupabase } from "@/shared/utils";

/**
 * 현재 인증된 사용자의 데이터를 가져오는 메소드
 *
 * @description
 * 1. Supabase 인증을 통해 현재 세션의 사용자 정보를 가져옵니다.
 * 2. 사용자가 인증되어 있지 않은 경우 null을 반환합니다.
 * 3. 인증된 사용자의 ID를 사용하여 users 테이블에서 해당 사용자의 전체 데이터를 조회합니다.
 *
 * @returns {Promise<object|null>} 사용자 데이터 객체 또는 인증되지 않은 경우 null
 * @throws {Error} Supabase 쿼리 실행 중 오류가 발생한 경우
 *
 * @example
 * const userData = await getCurrentUserData();
 * if (userData) {
 *   console.log('사용자 데이터:', userData);
 * } else {
 *   console.log('인증된 사용자가 없습니다.');
 * }
 */
export const getCurrentUserData = async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const {
    data: { publicUrl }
  } = await supabase.storage
    .from("profile_image")
    .getPublicUrl(`${user.id}.jpg`);

  return {
    ...user,
    profileUrl: publicUrl
  };
};
