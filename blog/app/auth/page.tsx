"use client";

import { EmailLoginForm, LogoutForm } from "@/features/auth/ui";

import { useSession } from "@/shared/model";

const LoginPage = () => {
  const user = useSession();

  return (
    <section className="media-padding-x flex flex-grow flex-col items-center justify-center gap-4 bg-secondary">
      {user ? <LogoutForm /> : <EmailLoginForm />}
      <div className="flex flex-col items-center text-secondary">
        <p className="text-5xl font-extrabold text-secondary">°◇°;</p>
        <p>허걱쓰 어떻게 알고 찾아오셨죠</p>
        <p>
          해당 페이지는 블로그 주인장이 블로그를 관리하기 위해 만든
          페이지입니다.
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
