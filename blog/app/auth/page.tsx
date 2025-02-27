import { OAuthLoginForm } from "@/features/auth/ui";
import { LogoutForm } from "@/features/auth/ui/LogoutForm";

import { checkUserLoggedIn } from "@/shared/lib";

const LoginPage = async () => {
  const { isLoggedIn } = await checkUserLoggedIn();

  return (
    <section className="media-padding-x flex flex-grow flex-col items-center justify-center gap-4 bg-secondary">
      {isLoggedIn ? <LogoutForm /> : <OAuthLoginForm />}
    </section>
  );
};

export default LoginPage;
