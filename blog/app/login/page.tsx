import { OAuthLoginForm } from "@/features/auth/ui";

const LoginPage = () => {
  return (
    <section className="media-padding-x flex flex-grow flex-col items-center justify-center gap-4 bg-secondary">
      <OAuthLoginForm />
    </section>
  );
};

export default LoginPage;
