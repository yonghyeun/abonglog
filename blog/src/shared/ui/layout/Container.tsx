import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  variant?: "reading" | "listing" | "full";
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = "listing",
  className,
}) => {
  const maxWidthClass = {
    reading: "max-w-[720px]", // 45rem
    listing: "max-w-[1024px]", // 64rem
    full: "max-w-full",
  };

  return (
    <div
      className={twMerge(
        "mx-auto w-full px-4 sm:px-6 md:px-8", // Responsive Padding
        maxWidthClass[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
