import { EmailLoginForm, LogoutForm } from "@/features/auth/ui";

import { checkUserLoggedIn } from "@/shared/lib";

const LoginPage = async () => {
  const { isLoggedIn } = await checkUserLoggedIn();

  return (
    <section className="media-padding-x flex flex-grow flex-col items-center justify-center gap-4 bg-secondary">
      {isLoggedIn ? <LogoutForm /> : <EmailLoginForm />}
    </section>
  );
};

export default LoginPage;
