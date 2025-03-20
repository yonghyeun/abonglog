import { useRouter } from "next/navigation";

import { createBrowserSupabase } from "@/shared/model";

export const useLogoutAction = () => {
  const supabase = createBrowserSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return handleLogout;
};
