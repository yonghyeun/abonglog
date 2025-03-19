"use client";

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createBrowserSupabase } from "@/shared/model";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    // 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // 세션 변경 감지
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    user: session?.user ?? null
  };
};
