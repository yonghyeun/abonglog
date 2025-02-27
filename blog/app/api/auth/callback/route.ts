import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { HOST_EMAIL } from "@/shared/config";
import { createServerSupabase } from "@/shared/utils";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(url.origin);
  }

  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  const { user } = data;

  if (error) {
    redirect(`/error/${error.code}`);
  }

  if (!user) {
    redirect(`/error/401`);
  }

  return NextResponse.redirect(url.origin);
};
