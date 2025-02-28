import { PropsWithChildren } from "react";

import { CloseIcon, SearchIcon } from "@/shared/config";
import { Button } from "@/shared/ui/Button";

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex flex-col gap-4 rounded-sm border p-4">
      {children}
    </section>
  );
};

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

interface RemoveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="rounded-md p-2 text-gray-400 hover:bg-gray-200"
    >
      <CloseIcon size={24} />
    </button>
  );
};

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchProps> = (props) => {
  return (
    <div className="flex w-full items-center justify-start gap-2">
      <label htmlFor="search-tag" aria-label="tag 검색어로 찾기">
        <SearchIcon size={24} className="text-gray-300" />
      </label>
      <input
        id="search-tag"
        className="flex-grow rounded-md bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
        placeholder="태그명을 입력해주세요"
        {...props}
      />
    </div>
  );
};

interface CreateTagInputProps {
  action: (formData: FormData) => void | Promise<void>;
}
const CreateTagInput: React.FC<CreateTagInputProps> = ({ action }) => (
  <form className="flex items-end justify-start gap-2" action={action}>
    <label htmlFor="create-tag" className="sr-only">
      새로운 태그 추가하기
    </label>
    <input
      id="search-tag"
      className="rounded-lg bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
      placeholder="태그명을 입력해주세요"
      name="tag"
    />
    <Button variant="outlined" size="sm" type="submit">
      추가하기
    </Button>
  </form>
);

export const TagSelector = Object.assign(Wrapper, {
  Container,
  RemoveButton,
  SearchInput,
  CreateTagInput
});
