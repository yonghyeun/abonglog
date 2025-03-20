"use client";

import { useLogoutAction } from "../model/useLogoutAction";

import { Button } from "@/shared/ui/Button";

export const LogoutForm = () => {
  const handleLogout = useLogoutAction();

  return (
    <section
      className="flex flex-col gap-4"
      role="form"
      aria-labelledby="login-form-title"
    >
      <div className="flex flex-col gap-4">
        <header className="flex">
          <h1 id="logout-form-title" className="flex-grow text-center">
            <label htmlFor="logout-form">abonglog Logout</label>
          </h1>
        </header>
        <form
          id="logout-form"
          aria-labelledby="logout-form-title"
          action={handleLogout}
        >
          <Button
            size="md"
            variant="filled"
            type="submit"
            className="flex w-full items-center gap-2"
            aria-label="로그아웃"
          >
            <p className="flex-grow text-center">로그아웃</p>
          </Button>
        </form>
      </div>
      <aside
        className="text-sm text-gray-400"
        role="complementary"
        aria-labelledby="logout-form-title"
      >
        <p>
          현재 로그인 기능은 주인장이 블로그를 관리하기 위해서만 사용 됩니다.
        </p>
        <p>추후 댓글 기능을 추가하면 로그인 후 댓글을 사용 하실 수 있습니다.</p>
      </aside>
    </section>
  );
};
