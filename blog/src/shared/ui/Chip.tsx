const chipStyles = [
  "bg-status-error text-white hover:opacity-90",
  "bg-brand-primary text-white hover:opacity-90",
  "bg-status-warning text-black hover:opacity-90",
  "bg-gray-500 text-white hover:opacity-90",
  "bg-black text-white hover:opacity-90",
  "bg-red-700 text-white hover:opacity-90",
  "bg-brand-primary/80 text-white hover:opacity-90",
  "bg-yellow-300 text-black hover:opacity-90",
  "bg-gray-300 text-black hover:opacity-90",
  "bg-red-100 text-red-700 hover:bg-red-200",
  "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",
  "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
] as const;
interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme: number;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  theme,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${
        chipStyles[(theme % chipStyles.length) - 1]
      } rounded-full px-4 py-1 text-xs ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
