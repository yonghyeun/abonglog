import { Notify } from "./Notify";
import { NotifyData, useNotifyStore } from "./model";
import { useEffect, useRef, useState } from "react";

// 위치 타입 정의
type Position = "top" | "bottom";
type Direction = "left" | "right";
type QueuePosition = `${Position}${Capitalize<Direction>}`;

// 위치별 설정
const positionConfig: Record<
  QueuePosition,
  { className: string; slideDirection: "left" | "right" }
> = {
  topLeft: { className: "fixed left-4 top-0", slideDirection: "left" },
  topRight: { className: "fixed right-4 top-0", slideDirection: "right" },
  bottomLeft: { className: "fixed bottom-0 left-4", slideDirection: "left" },
  bottomRight: { className: "fixed bottom-0 right-4", slideDirection: "right" }
};

export const NotifyContainer = () => (
  <>
    <NotifyQueue position="topLeft" />
    <NotifyQueue position="topRight" />
    <NotifyQueue position="bottomLeft" />
    <NotifyQueue position="bottomRight" />
  </>
);

const NotifyQueue = ({ position }: { position: QueuePosition }) => {
  const items = useNotifyStore((state) => state[`${position}Queue`]);
  const remove = useNotifyStore((state) => state[position].remove);

  const config = positionConfig[position];

  return (
    <aside className={`${config.className} z-[9999]`}>
      <ul className="flex flex-col gap-2 py-2">
        {items.map((item) => (
          <li key={item.id}>
            <AnimatedNotify
              position={config.slideDirection}
              remove={remove}
              {...item}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

interface AnimatedNotifyProps extends NotifyData {
  position: "left" | "right";
  remove: (data: NotifyData) => void;
}

const SLIDE_ANIMATION_TIME = 150;
const AUTO_REMOVE_TIME = 5000;

const AnimatedNotify: React.FC<AnimatedNotifyProps> = ({
  position,
  remove,
  ...item
}) => {
  const [isExisting, setIsExiting] = useState<boolean>(false);
  const onOpen = () => setIsExiting(true);
  const onClose = () => setIsExiting(false);

  // 생성 될 때 애니메이션을 제어 할 ref
  const createTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 수동으로 제거 될 때 애니메이션을 제어 할 ref
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 자동으로 제거 될 때 애니메이션을 제어 할 ref
  const autoRemoveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 초기 마운트
    if (!isExisting && !createTimerRef.current) {
      createTimerRef.current = setTimeout(onOpen, 0);
      autoRemoveTimerRef.current = setTimeout(onClose, AUTO_REMOVE_TIME);
      return;
    }
    // 수동 제거
    if (!isExisting && !removeTimerRef.current) {
      // 자동 타이머 제거
      if (autoRemoveTimerRef.current) {
        clearTimeout(autoRemoveTimerRef.current);
      }

      removeTimerRef.current = setTimeout(
        () => remove(item),
        SLIDE_ANIMATION_TIME
      );
      return;
    }
  }, [isExisting, remove, item]);

  return (
    <div
      className={`transition-all duration-[${SLIDE_ANIMATION_TIME}] ${isExisting ? "" : position === "left" ? "-translate-x-full" : "translate-x-full"}`}
    >
      <Notify {...item} onClose={onClose} />
    </div>
  );
};
