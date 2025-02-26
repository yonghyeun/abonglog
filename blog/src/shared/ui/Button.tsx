interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof buttonSizes;
  variant: keyof typeof buttonStyles;
}

const buttonStyles = {
  filled:
    "bg-sky-blue text-white hover:bg-bright-blue active:scale-105 transform",
  outlined:
    "bg-primary text-sky-blue border border-2 border-sky-blue hover:bg-secondary active:scale-105 transform"
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
