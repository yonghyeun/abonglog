"use client";

import { useRouter } from "next/navigation";

import { OAuthLoginForm } from "@/features/auth/ui";

const LoginModal = () => {
  const router = useRouter();
  return (
    <section className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
      <OAuthLoginForm isModal onClose={() => router.back()} />
    </section>
  );
};

export default LoginModal;
