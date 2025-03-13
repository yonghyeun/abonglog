"use server";

import { createServerSupabase } from "@/shared/model";

export const logoutAction = async () => {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();

  // TODO : 에러 핸들링 생각해보기
  if (error) {
    console.error(error);
  }
};
