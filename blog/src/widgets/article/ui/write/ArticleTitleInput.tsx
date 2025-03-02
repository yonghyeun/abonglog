export const ArticleTitleInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        제목
      </label>
      <input
        id={id}
        {...props}
        className="w-full p-2 text-3xl outline-none focus:outline-none"
      />
      <div className="h-2 w-32 bg-secondary" />
    </div>
  );
};
