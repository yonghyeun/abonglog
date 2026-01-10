interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof buttonSizes;
  variant: keyof typeof buttonStyles;
}

const buttonStyles = {
  filled:
    "bg-brand-primary text-white hover:opacity-90 active:scale-105 disabled:bg-gray-300 disabled:text-gray-500 transform",
  outlined:
    "bg-app text-brand-primary border border-2 border-brand-primary hover:bg-surface-2 active:scale-105 disabled:bg-gray-100 disabled:text-gray-400 transform"
} as const;

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
} as const;

const buttonDefaultClassName =
  "rounded-md transition-transform duration-50 font-semibold";

export const Button: React.FC<ButtonProps> = ({
  children,
  size,
  variant,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${buttonDefaultClassName} ${buttonSizes[size]} ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
