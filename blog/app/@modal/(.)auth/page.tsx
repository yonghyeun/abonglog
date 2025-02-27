import { OAuthLoginForm } from "@/features/auth/ui";
import { LogoutForm } from "@/features/auth/ui/LogoutForm";

import { checkUserLoggedIn } from "@/shared/lib";
import { RoutingModal } from "@/shared/ui/RoutingModal";

const AuthModal = async () => {
  const { isLoggedIn } = await checkUserLoggedIn();
  return (
    <RoutingModal>
      {isLoggedIn ? <LogoutForm /> : <OAuthLoginForm />}
    </RoutingModal>
  );
};

export default AuthModal;
