"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useSession } from "@/entities/user/model";

const WriteLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  if (!user) {
    router.push("/auth");
    // TODO 인증 관련 에러 페이지 생성하기
    return null;
  }

  return children;
};

export default WriteLayout;
