import { useNotifyStore } from "./model";
import { useEffect, useRef, useState } from "react";

type NotifyType = "error" | "info" | "success";

// 반환 타입을 명시적으로 지정
type NotifyMethodsByType = {
  [key in NotifyType]: (text: string) => void;
};

const createRandomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const createNotifyMethod = (
  setter: (data: { id: string; type: NotifyType; text: string }) => void
): NotifyMethodsByType => {
  const types: NotifyType[] = ["error", "info", "success"];

  // 타입이 있는 초기 객체 사용
  return types.reduce(
    (acc, type) => {
      acc[type] = (text: string) => {
        setter({
          id: createRandomId(),
          type,
          text
        });
      };
      return acc;
    },
    {} as NotifyMethodsByType // 초기값에 타입 지정
  );
};

/**
 * useNotify 훅은 알림을 추가하는 메서드를 제공합니다.
 * 각 메서드는 알림의 위치에 따라 다르게 설정됩니다.
 */
export const useNotify = () => {
  const addTopLeft = useNotifyStore((state) => state.topLeft.add);
  const addTopRight = useNotifyStore((state) => state.topRight.add);
  const addBottomLeft = useNotifyStore((state) => state.bottomLeft.add);
  const addBottomRight = useNotifyStore((state) => state.bottomRight.add);

  return {
    notifyTopLeft: createNotifyMethod(addTopLeft),
    notifyTopRight: createNotifyMethod(addTopRight),
    notifyBottomLeft: createNotifyMethod(addBottomLeft),
    notifyBottomRight: createNotifyMethod(addBottomRight)
  };
};

/**
 * useSlideAnimation 훅은 알림의 슬라이드 애니메이션을 처리합니다.
 */
export const useSlideAnimation = (
  removeAction: () => void,
  options?: {
    slideAnimationTime?: number;
    autoRemoveTime?: number;
  }
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { slideAnimationTime = 150, autoRemoveTime = 5000 } = options || {};

  // 클린업을 위한 타이머 ref
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  // 새 타이머 등록 함수
  const registerTimer = (callback: () => unknown, delay: number) => {
    timersRef.current.push(setTimeout(callback, delay));
  };

  // 클린업 함수
  const cleanupTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    // 생성 애니메이션
    registerTimer(() => setIsVisible(true), 0);

    // 자동 제거 애니메이션
    registerTimer(() => {
      setIsVisible(false);
      registerTimer(removeAction, slideAnimationTime);
    }, autoRemoveTime);

    return cleanupTimers;
  }, [removeAction, slideAnimationTime, autoRemoveTime]);

  // 메뉴얼 hide 핸들러
  const handleHide = () => {
    setIsVisible(false);

    if (timersRef.current.length > 0) {
      cleanupTimers();
    }
    registerTimer(removeAction, slideAnimationTime);
  };

  return [isVisible, handleHide] as const;
};
