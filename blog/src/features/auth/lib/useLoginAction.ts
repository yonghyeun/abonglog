"use client";

import { loginAction } from "./loginAction";
import { useActionState, useEffect, useRef, useState } from "react";

interface State {
  error: boolean;
  message: string;
}

const DEFAULT_TIMER_DELAY = 1500;
const DEFAULT_INITIAL_STATE: State = {
  error: false,
  message: ""
};

/**
 * useLoginAction 훅
 *
 * 로그인 폼의 상태를 관리하고, 서버 액션을 호출하여 로그인 처리를 수행합니다.
 * 이 때 서버의 에러 상태가 변경되면 delay 후에 초기 상태로 변경합니다.
 *
 * @returns {Object} formAction - 폼 제출 액션 함수
 * @returns {boolean} isPending - 로딩 상태
 * @returns {Function} getSubmitButtonClassName - 제출 버튼의 클래스 이름을 반환하는 함수
 * @returns {Function} getSubmitButtonMessage - 제출 버튼의 메시지를 반환하는 함수
 */
export const useLoginAction = () => {
  const [serverState, formAction, isPending] = useActionState(
    loginAction,
    DEFAULT_INITIAL_STATE
  );

  const [clientState, setClientState] = useState<State>(DEFAULT_INITIAL_STATE);

  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!serverState.error) {
      return;
    }

    setClientState(serverState);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
    }

    errorTimer.current = setTimeout(() => {
      setClientState(DEFAULT_INITIAL_STATE);
    }, DEFAULT_TIMER_DELAY);

    return () => {
      if (errorTimer.current) {
        clearTimeout(errorTimer.current);
      }
    };
  }, [serverState]);

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
