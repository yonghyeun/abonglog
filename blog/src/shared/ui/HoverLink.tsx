import Link, { LinkProps } from "next/link";
import React from "react";

interface HoverLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverLink: React.FC<HoverLinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={`shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
