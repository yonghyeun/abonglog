import { Notify } from "./Notify";
import { useSlideAnimation } from "./lib";
import { NotifyData, useNotifyStore } from "./model";

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

const NOTIFY_QUEUE_POSITION = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight"
] as const;

export const NotifyContainer = () =>
  NOTIFY_QUEUE_POSITION.map((position) => (
    <NotifyQueue key={position} position={position} />
  ));

const NotifyQueue = ({ position }: { position: QueuePosition }) => {
  const items = useNotifyStore((state) => state[`${position}Queue`]);
  const remove = useNotifyStore((state) => state[position].remove);

  const config = positionConfig[position];

  return (
    <section className={`${config.className} z-[9999]`}>
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
    </section>
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
  const [isVisible, setIsVisible] = useSlideAnimation(() => remove(item), {
    slideAnimationTime: SLIDE_ANIMATION_TIME,
    autoRemoveTime: AUTO_REMOVE_TIME
  });

  return (
    <div
      className={`transition-all duration-[${SLIDE_ANIMATION_TIME}] ${isVisible ? "" : position === "left" ? "-translate-x-full" : "translate-x-full"}`}
    >
      <Notify {...item} onClose={() => setIsVisible(false)} />
    </div>
  );
};
