import { OAuthLoginForm } from "@/features/auth/ui";

import { RoutingModal } from "@/shared/ui/RoutingModal";

const LoginModal = () => {
  return (
    <RoutingModal>
      <OAuthLoginForm />
    </RoutingModal>
  );
};

export default LoginModal;
