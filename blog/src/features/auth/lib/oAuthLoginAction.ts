"use server";

import { getSupabaseClient } from "@/shared/lib";

export const OAuthLoginAction = async () => {
  const supabase = await getSupabaseClient();

  const data = await supabase.auth.signInWithOAuth({
    provider: "github"
  });

  console.log(data);
};
