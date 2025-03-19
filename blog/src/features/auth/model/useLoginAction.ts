"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createBrowserSupabase } from "@/shared/model";

interface State {
  error: boolean;
  message: string;
}

const DEFAULT_TIMER_DELAY = 1500;
const DEFAULT_INITIAL_STATE: State = {
  error: false,
  message: ""
};

export const useLoginAction = () => {
  const [isPending, setIsPending] = useState(false);
  const [clientState, setClientState] = useState<State>(DEFAULT_INITIAL_STATE);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    try {
      setIsPending(true);
      const supabase = createBrowserSupabase();
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setClientState({
          error: true,
          message: error.message
        });

        if (errorTimer.current) {
          clearTimeout(errorTimer.current);
        }

        errorTimer.current = setTimeout(() => {
          setClientState(DEFAULT_INITIAL_STATE);
        }, DEFAULT_TIMER_DELAY);
      }

      router.push("/");
    } catch {
      setClientState({
        error: true,
        message: "로그인 중 오류가 발생했습니다."
      });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimer.current) {
        clearTimeout(errorTimer.current);
      }
    };
  }, []);

  const getSubmitButtonMessage = () => {
    if (isPending) {
      return "로그인 중..";
    }
    if (clientState.error) {
      return clientState.message;
    }
    return "로그인";
  };

  const getSubmitButtonClassName = () => {
    if (isPending) {
      return "bg-gray-500 hover:bg-gray-600";
    }
    if (clientState.error) {
      return "bg-red-600 hover:bg-red-500";
    }
    return "";
  };

  return {
    formAction,
    isPending,
    getSubmitButtonClassName,
    getSubmitButtonMessage
  };
};
