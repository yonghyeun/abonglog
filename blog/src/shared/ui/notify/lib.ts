import { useNotifyStore } from "./model";

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
