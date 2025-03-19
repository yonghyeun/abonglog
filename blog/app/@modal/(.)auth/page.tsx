"use client";

import { EmailLoginForm } from "@/features/auth/ui";
import { LogoutForm } from "@/features/auth/ui/LogoutForm";

import { useSession } from "@/entities/user/model/useSession";

import { RoutingModal } from "@/shared/ui/RoutingModal";

const AuthModal = () => {
  const { user } = useSession();

  return (
    <RoutingModal>{user ? <LogoutForm /> : <EmailLoginForm />}</RoutingModal>
  );
};

export default AuthModal;
