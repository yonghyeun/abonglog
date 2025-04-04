import { Notify } from "./Notify";
import { useNotifyStore } from "./model";
import { PropsWithChildren, useEffect, useState } from "react";

export const NotifyContainer = () => (
  <>
    <TopLeftQueue />
    <TopRightQueue />
    <BottomLeftQueue />
    <BottomRightQueue />
  </>
);

const TopLeftQueue = () => {
  const topLeftQueue = useNotifyStore((state) => state.topLeftQueue);
  const { remove } = useNotifyStore((state) => state.topLeft);

  return (
    <aside className="fixed left-4 top-0 z-[9999]">
      <ul className="flex flex-col gap-2 py-2">
        {topLeftQueue.map((item) => (
          <li key={item.id}>
            <SlideItem position="left">
              <Notify
                type={item.type}
                text={item.text}
                onClose={() => remove(item)}
              />
            </SlideItem>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const TopRightQueue = () => {
  const topRightStack = useNotifyStore((state) => state.topRightQueue);
  const { remove } = useNotifyStore((state) => state.topRight);

  return (
    <aside className="fixed right-4 top-0 z-[9999]">
      <ul className="flex flex-col gap-2 py-2">
        {topRightStack.map((item) => (
          <li key={item.id}>
            <SlideItem position="right">
              <Notify
                type={item.type}
                text={item.text}
                onClose={() => remove(item)}
              />
            </SlideItem>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const BottomLeftQueue = () => {
  const bottomLeftQueue = useNotifyStore((state) => state.bottomLeftQueue);
  const { remove } = useNotifyStore((state) => state.bottomLeft);

  return (
    <aside className="fixed bottom-0 left-4 z-[9999]">
      <ul className="flex flex-col gap-2 py-2">
        {bottomLeftQueue.map((item) => (
          <li key={item.id}>
            <SlideItem position="left">
              <Notify
                type={item.type}
                text={item.text}
                onClose={() => remove(item)}
              />
            </SlideItem>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const BottomRightQueue = () => {
  const bottomRightQueue = useNotifyStore((state) => state.bottomRightQueue);
  const { remove } = useNotifyStore((state) => state.bottomRight);

  return (
    <aside className="fixed bottom-0 right-4 z-[9999]">
      <ul className="flex flex-col gap-2 py-2">
        {bottomRightQueue.map((item) => (
          <li key={item.id}>
            <SlideItem position="right">
              <Notify
                type={item.type}
                text={item.text}
                onClose={() => remove(item)}
              />
            </SlideItem>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const SlideItem: React.FC<
  PropsWithChildren & { position: "left" | "right" }
> = ({ children, position }) => {
  const [isExisting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-150 ${isExisting ? "" : position === "left" ? "-translate-x-full" : "translate-x-full"}`}
    >
      {children}
    </div>
  );
};
