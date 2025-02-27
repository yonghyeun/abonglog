"use server";

import { headers as _headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabase } from "@/shared/utils";

export const OAuthLoginAction = async () => {
  const supabase = await createServerSupabase();

  const headers = await _headers();
  const origin = headers.get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/api/auth/callback`
    }
  });

  redirect(error ? origin || "/" : data.url);
};
