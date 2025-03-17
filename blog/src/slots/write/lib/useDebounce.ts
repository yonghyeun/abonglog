import { useCallback, useRef } from "react";

type UseDebounce = (callback: () => void, delay: number) => () => void;

export const useDebounce: UseDebounce = (callback, delay) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(callback, delay);
  }, [callback, delay]);
};
