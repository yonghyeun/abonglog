"use server";

import { AuthApiError, isAuthApiError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createServerSupabase } from "@/shared/utils";

const LOGIN_ERROR_MESSAGES: Record<AuthApiError["status"], string> = {
  400: "이메일 또는 비밀번호가 올바르지 않습니다."
};

export const loginAction = async (_prevState: unknown, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      message: "필수 항목을 모두 입력해 주세요",
      error: true
    };
  }

  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string
    });

    if (error) {
      throw error;
    }

    redirect("/");
  } catch (error) {
    if (isAuthApiError(error)) {
      return {
        message:
          LOGIN_ERROR_MESSAGES[error.status] ||
          "예기치 못한 에러가 발생했습니다.",
        error: true
      };
    }

    return {
      message: "예기치 못한 에러가 발생했습니다.",
      error: true
    };
  }
};
