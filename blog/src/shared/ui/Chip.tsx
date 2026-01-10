const chipStyles = [
  "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-200 hover:opacity-80",
  "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-200 hover:opacity-80",
  "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200 hover:opacity-80",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-200 hover:opacity-80",
  "bg-lime-100 text-lime-800 dark:bg-lime-500/10 dark:text-lime-200 hover:opacity-80",
  "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-200 hover:opacity-80",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200 hover:opacity-80",
  "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-200 hover:opacity-80",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-200 hover:opacity-80",
  "bg-sky-100 text-sky-800 dark:bg-sky-500/10 dark:text-sky-200 hover:opacity-80",
  "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-200 hover:opacity-80",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200 hover:opacity-80",
  "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-200 hover:opacity-80",
  "bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-200 hover:opacity-80",
  "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/10 dark:text-fuchsia-200 hover:opacity-80",
  "bg-pink-100 text-pink-800 dark:bg-pink-500/10 dark:text-pink-200 hover:opacity-80",
  "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-200 hover:opacity-80",
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
  // Ensure array index is non-negative and valid
  const safeIndex = Math.abs(theme) % chipStyles.length;
  
  return (
    <button
      className={`${
        chipStyles[safeIndex]
      } rounded-full px-4 py-1 text-xs ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
