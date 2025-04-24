import { Button } from "./Button";
import React from "react";

interface SelectorProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<SelectorProps> = ({ children, className }) => {
  return (
    <section
      className={`flex flex-col gap-4 border bg-primary p-4 ${className}`}
    >
      {children}
    </section>
  );
};

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string;
}

interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> {
  value?: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ className = "", value, ...props }) => {
  return (
    <label className={`text-gray-400 ${className}`} {...props}>
      {value}
    </label>
  );
};

const Input: React.FC<SearchInputProps> = ({ ...props }) => {
  return (
    <input
      className="flex-grow bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-purple-700"
      {...props}
    />
  );
};

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <form
      className={`flex items-end justify-start gap-2 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

const SubmitButton: React.FC<Partial<React.ComponentProps<typeof Button>>> = ({
  children,
  ...props
}) => {
  return (
    <Button variant="outlined" size="sm" type="submit" {...props}>
      {children}
    </Button>
  );
};

export const Selector = Object.assign(Wrapper, {
  Label,
  Input,
  Form,
  SubmitButton
});
