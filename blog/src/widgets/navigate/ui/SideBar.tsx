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
        className="flex flex-col gap-1 rounded-lg p-2 text-primary hover:bg-secondary focus:outline-none focus:ring focus:ring-purple-500 active:bg-secondary"
        aria-label="메뉴 열기"
        tabIndex={0}
        onClick={toggleSidebar("open")}
      >
        <span className="h-0.5 w-4 bg-gray-400"></span>
        <span className="h-0.5 w-4 bg-gray-400"></span>
        <span className="h-0.5 w-4 bg-gray-400"></span>
      </button>

      {/* 사이드바 컴포넌트 */}
      <aside
        className={`absolute left-0 top-0 flex max-h-screen min-h-80 max-w-[80%] flex-col justify-between gap-4 overflow-y-auto bg-primary px-4 pb-1 pt-4 ${isOpen ? "" : "-translate-x-full"} z-50 rounded-r-lg transition-transform duration-300`}
        ref={sideBarRef}
      >
        <div>
          {/* 사이드바 헤더 */}
          <div className="mb-4 flex items-center justify-between">
            <h1>abonglog</h1>
            <button
              onClick={toggleSidebar("close")}
              aria-label="메뉴 닫기"
              className="p-2 text-primary hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-300 active:bg-gray-200"
            >
              <BackwardIcon size="24" />
            </button>
          </div>
          {/* 목차 */}
          <nav className="text-primary">
            <ul className="flex flex-col gap-4">
              {Object.entries(data).map(
                ([seriesName, articleMetaList], index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <p
                      key={index}
                      className="flex w-fit items-center gap-2 text-xl text-primary"
                    >
                      {seriesName}
                    </p>
                    <ul className="flex flex-col gap-2 text-secondary">
                      {articleMetaList.map(({ title, id }) => (
                        <li key={id} className="ml-8 list-disc">
                          <Link
                            href={`/article/${id}`}
                            className="hover:text-purple-500"
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
          <div className="flex flex-col justify-between border-t-[1px] border-gray-200 sm:flex-row">
            <Link
              href="/write"
              className="text-md p-2 text-gray-400 hover:bg-secondary"
            >
              글 쓰기
            </Link>
            <Link
              className="text-md p-2 text-gray-400 hover:bg-secondary"
              href="/temp"
            >
              임시저장 게시글 목록
            </Link>
            <Link
              className="flex items-end gap-2 p-2 hover:bg-secondary"
              href="/auth"
            >
              <AdminProfile size="sm" />
              <p className="text-xs text-gray-400">{user.email}</p>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};
