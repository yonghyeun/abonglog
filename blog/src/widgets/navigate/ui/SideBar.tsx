"use client";

import { useSidebar } from "../lib";
import Link from "next/link";

import { useGetArticleMetaListPerSeries } from "@/entities/article/model";
import { AdminProfile } from "@/entities/user/ui";

import { BackwardIcon } from "@/shared/config";
import { useSession } from "@/shared/model";

export const SideBar = () => {
  const { isOpen, sideBarRef, toggleSidebar } = useSidebar();
  const { data } = useGetArticleMetaListPerSeries();
  const user = useSession();

  return (
    <>
      {/* 사이드바 햄버거 */}
      <button
        className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full p-2 text-primary transition-all duration-300 hover:bg-secondary active:scale-95"
        aria-label="메뉴 열기"
        tabIndex={0}
        onClick={toggleSidebar("open")}
      >
        <span className="h-0.5 w-5 rounded-full bg-secondary transition-all duration-300 group-hover:w-6 group-hover:bg-brand-primary"></span>
        <span className="h-0.5 w-5 rounded-full bg-secondary transition-all duration-300 group-hover:bg-brand-primary"></span>
        <span className="h-0.5 w-5 rounded-full bg-secondary transition-all duration-300 group-hover:w-6 group-hover:bg-brand-primary"></span>
      </button>

      {/* 사이드바 컴포넌트 */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen min-h-80 w-80 max-w-[80%] flex-col justify-between gap-4 overflow-y-auto border-r border-default bg-surface-1 px-6 pb-6 pt-6 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        ref={sideBarRef}
      >
        <div>
          {/* 사이드바 헤더 */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-bold text-brand-primary">abonglog</h1>
            <button
              onClick={toggleSidebar("close")}
              aria-label="메뉴 닫기"
              className="rounded-full p-2 text-secondary transition-colors hover:bg-surface-2 hover:text-brand-primary active:scale-95"
            >
              <BackwardIcon size="24" />
            </button>
          </div>
          {/* 목차 */}
          <nav className="text-primary">
            <ul className="flex flex-col gap-6">
              {Object.entries(data).map(
                ([seriesName, articleMetaList], index) => (
                  <li key={index} className="flex flex-col gap-2">
                    <h3
                      className="flex w-fit items-center gap-2 text-lg font-bold text-brand-primary"
                    >
                      {seriesName}
                    </h3>
                    <ul className="flex flex-col gap-1 border-l-2 border-default pl-4">
                      {articleMetaList.map(({ title, id }) => (
                        <li key={id} className="group relative">
                          <Link
                            href={`/article/${id}`}
                            className="block rounded-md py-1 text-sm text-secondary transition-all duration-200 hover:translate-x-1 hover:text-brand-primary"
                            onClick={toggleSidebar("close")}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        {user && (
          <div className="flex flex-col gap-2 border-t border-default pt-4">
            <Link
              href="/write"
              className="flex w-full items-center justify-center rounded-lg bg-surface-2 py-2 text-sm font-medium text-primary transition-all hover:bg-brand-primary hover:text-white hover:shadow-md active:scale-95"
            >
              글 쓰기
            </Link>
            <Link
              className="flex w-full items-center justify-center rounded-lg py-2 text-sm text-secondary transition-colors hover:bg-surface-2 hover:text-primary"
              href="/temp"
            >
              임시저장 게시글 목록
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface-2"
              href="/auth"
            >
              <AdminProfile size="sm" />
              <p className="text-xs text-secondary">{user.email}</p>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};
