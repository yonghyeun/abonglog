"use client";

import { Button } from "./Button";

const Wrapper: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <form {...props} className="flex flex-col gap-4">
      {children}
    </form>
  );
};

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className = "",
  ...props
}) => {
  return <label {...props} className={`${className} text-center`} />;
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className="rounded-lg border bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
    />
  );
};

const SubmitButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <Button variant="filled" size="md" {...props} type="submit">
      {children}
    </Button>
  );
};

export const Form = Object.assign(Wrapper, {
  Container,
  Label,
  Input,
  SubmitButton
});
