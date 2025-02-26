import { OAuthLoginAction } from "../lib";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/shared/ui/Button";

export const OAuthLoginForm: React.FC = () => {
  return (
    <section
      className="flex flex-col gap-4"
      role="form"
      aria-labelledby="login-form-title"
    >
      <div className="flex flex-col gap-4">
        <header className="flex">
          <h1 id="login-form-title" className="flex-grow text-center">
            <label htmlFor="login-form">abonglog Login</label>
          </h1>
        </header>
        <form
          id="login-form"
          aria-labelledby="login-form-title"
          action={OAuthLoginAction}
        >
          <Button
            size="lg"
            variant="filled"
            type="submit"
            className="flex w-full items-center gap-2"
            aria-label="Github 계정으로 로그인"
          >
            <FaGithub size="24" />
            <p className="flex-grow text-center">Github 계정으로 로그인</p>
          </Button>
        </form>
      </div>
      <aside
        className="text-sm text-gray-400"
        role="complementary"
        aria-labelledby="login-form-title"
      >
        <p>
          현재 로그인 기능은 주인장이 블로그를 관리하기 위해서만 사용 됩니다.
        </p>
        <p>추후 댓글 기능을 추가하면 로그인 후 댓글을 사용 하실 수 있습니다.</p>
      </aside>
    </section>
  );
};
