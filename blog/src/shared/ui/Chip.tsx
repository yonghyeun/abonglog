const chipStyles = [
  "bg-red-500 text-white hover:bg-red-600",
  "bg-purple-500 text-white hover:bg-purple-600",
  "bg-yellow-500 text-black hover:bg-yellow-600",
  "bg-gray-500 text-white hover:bg-gray-600",
  "bg-black text-white hover:bg-gray-800",
  "bg-red-700 text-white hover:bg-red-800",
  "bg-purple-700 text-white hover:bg-purple-800",
  "bg-yellow-300 text-black hover:bg-yellow-400",
  "bg-gray-300 text-black hover:bg-gray-400",
  "bg-red-100 text-red-700 hover:bg-red-200",
  "bg-purple-200 text-purple-700 hover:bg-purple-200",
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
