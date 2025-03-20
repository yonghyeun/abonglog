"use client";

import { useState, useTransition } from "react";

export const useTransitionInput = () => {
  const [text, setText] = useState<string>("");
  const [_, startTransition] = useTransition();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => setText(event.target.value));
  };

  return [text, handleChange] as const;
};
