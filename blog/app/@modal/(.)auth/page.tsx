import { EmailLoginForm } from "@/features/auth/ui";
import { LogoutForm } from "@/features/auth/ui/LogoutForm";

import { getCurrentUserData } from "@/entities/user/model";

import { RoutingModal } from "@/shared/ui/RoutingModal";

const AuthModal = async () => {
  const user = await getCurrentUserData();
  return (
    <RoutingModal>{user ? <LogoutForm /> : <EmailLoginForm />}</RoutingModal>
  );
};

export default AuthModal;
