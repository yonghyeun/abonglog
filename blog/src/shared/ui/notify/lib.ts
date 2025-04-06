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

type TimerRefRecord = Record<
  "create" | "remove" | "autoRemove",
  ReturnType<typeof setTimeout> | null
>;

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
  const { slideAnimationTime = 150, autoRemoveTime = 5000 } = options || {};

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const timerRefRecord = useRef<TimerRefRecord>({
    // 생성 될 때 애니메이션을 제어 할 ref
    create: null,
    // 수동으로 제거 될 때 애니메이션을 제어 할 ref
    remove: null,
    // 자동으로 제거 될 때 애니메이션을 제어 할 ref
    autoRemove: null
  });

  const animationEnd = useRef<boolean>(false);

  // 초기 마운트 시 애니메이션 시작 및 자동 제거 타이머 설정
  useEffect(() => {
    timerRefRecord.current.create = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        animationEnd.current = true;
      }, slideAnimationTime);
    }, 0);

    timerRefRecord.current.autoRemove = setTimeout(
      () => setIsVisible(false),
      autoRemoveTime
    );
  }, [autoRemoveTime, slideAnimationTime]);

  // isVisible이 false로 변경되고 애니메이션이 끝난 후 수동 제거 처리
  useEffect(() => {
    const timers = timerRefRecord.current;
    if (!isVisible && animationEnd.current && !timers.remove) {
      if (timers.autoRemove) {
        clearTimeout(timers.autoRemove);
      }
      timers.remove = setTimeout(removeAction, slideAnimationTime + 10);
    }
  }, [isVisible, removeAction, slideAnimationTime]);

  return [isVisible, setIsVisible] as const;
};
