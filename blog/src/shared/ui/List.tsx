import React from "react";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  className?: string;
}

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
}

const Order: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <ol className={`flex flex-grow flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </ol>
  );
};

const UnOrder: React.FC<ListProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <ul className={`flex flex-grow flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </ul>
  );
};

const Item: React.FC<ItemProps> = ({ children, className = "", ...props }) => {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

export const List = Object.assign({}, { Order, UnOrder, Item });
