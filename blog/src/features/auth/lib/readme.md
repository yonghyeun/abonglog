# useLoginAction 훅과 loginAction 서버 액션

이 문서는 `useLoginAction` 훅과 `loginAction` 서버 액션에 대한 설명을 제공합니다. 이 훅과 액션은 사용자가 이메일과 비밀번호를 사용하여 로그인할 수 있도록 도와줍니다.

## useLoginAction 훅

`useLoginAction` 훅은 로그인 폼의 상태를 관리하고, 서버 액션을 호출하여 로그인 처리를 수행합니다. 이 훅은 클라이언트 컴포넌트에서 사용됩니다.

### 사용 방법

```typescript
"use client";

import { loginAction } from "./loginAction";
import { useActionState, useEffect, useRef, useState } from "react";

interface State {
  error: boolean;
  message: string;
}

const DEFAULT_TIMER_DELAY = 1500;
const DEFAULT_INITIAL_STATE: State = { error: false, message: "" };

type UseLoginAction = () => {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  getSubmitButtonClassName: () => string;
  getSubmitButtonMessage: () => string;
};

export const useLoginAction: UseLoginAction = () => {
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
      return "bg-gray-400 hover:bg-gray-500";
    }
    if (clientState.error) {
      return "bg-red-500 hover:bg-red-600";
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
```
