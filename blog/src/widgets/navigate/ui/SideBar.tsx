"use client";

import { useSidebar } from "../lib";
import Link from "next/link";

import { BackwardIcon, BooksIcon, LibraryIcon } from "@/shared/config";

export const SideBar = () => {
  const { isOpen, sideBarRef, handleOpenSidebar, handleCloseSidebar } =
    useSidebar();

  return (
    <>
      {/* 사이드바 햄버거 */}
      <button
        className="flex flex-col gap-1 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 active:bg-gray-200"
        aria-label="메뉴 열기"
        tabIndex={0}
        onClick={handleOpenSidebar}
      >
        <span className="h-0.5 w-4 bg-gray-800"></span>
        <span className="h-0.5 w-4 bg-gray-800"></span>
        <span className="h-0.5 w-4 bg-gray-800"></span>
      </button>

      {/* 사이드바 컴포넌트 */}
      <aside
        className={`absolute left-0 top-0 min-h-80 min-w-96 px-2 py-4 ${isOpen ? "" : "-translate-x-full"} z-50 bg-primary shadow-md transition-transform duration-300`}
        ref={sideBarRef}
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleCloseSidebar}
            aria-label="메뉴 닫기"
            className="p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 active:bg-gray-200"
          >
            <BackwardIcon size="24" />
          </button>
        </div>
        {/* 목차 */}
        <nav>
          <h3 className="mb-2 border-b">게시글 목록</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-semibold flex items-center gap-2 text-gray-600 hover:text-blue-900">
              <BooksIcon />
              <Link href="#" className="py-2">
                전체 게시글 보기
              </Link>
            </li>
            <li className="text-semibold flex items-center gap-2 text-gray-600 hover:text-blue-900">
              <LibraryIcon />
              <Link href="#" className="py-2">
                시리즈 목록 보기
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
