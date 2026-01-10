import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import { createBrowserSupabase } from "@/shared/lib";
import { SessionContext } from "@/shared/model";

export const SessionProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabase] = useState(() => createBrowserSupabase());

  useEffect(() => {
    // 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session ? session.user : null);
    });

    // 세션 변경 감지
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return <SessionContext value={user}>{children}</SessionContext>;
};
