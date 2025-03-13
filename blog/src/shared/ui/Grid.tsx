const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
