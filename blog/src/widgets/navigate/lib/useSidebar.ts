import { useEffect, useRef, useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (status: "open" | "close") => () =>
    setIsOpen(status === "open" ? true : false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sideBarRef.current &&
      !sideBarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, toggleSidebar, sideBarRef };
};
