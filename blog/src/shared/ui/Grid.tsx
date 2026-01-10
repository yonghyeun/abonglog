const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {children}
    </ul>
  );
};

interface ItemProps {
  children: React.ReactNode;
  className?: string;
}

const Item: React.FC<ItemProps> = ({
  children,
  className = "aspect-ratio"
}) => {
  return <li className={`${className}`}>{children}</li>;
};

export const Grid = Object.assign(Wrapper, { Item });
