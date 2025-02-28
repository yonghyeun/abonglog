import { EmailLoginForm, LogoutForm } from "@/features/auth/ui";

import { getCurrentUserData } from "@/entities/user/model";

const LoginPage = async () => {
  const user = await getCurrentUserData();

  return (
    <section className="media-padding-x flex flex-grow flex-col items-center justify-center gap-4 bg-secondary">
      {user ? <LogoutForm /> : <EmailLoginForm />}
      <div className="flex flex-col items-center text-gray-400">
        <p className="text-2xl font-extrabold text-black">°◇°;</p>
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
