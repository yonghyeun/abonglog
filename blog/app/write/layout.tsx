"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useSession } from "@/shared/model";

const WriteLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return children;
};

export default WriteLayout;
