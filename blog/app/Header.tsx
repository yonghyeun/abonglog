"use client";

import Link from "next/link";

import { SideBar } from "@/widgets/navigate/ui";

import { DarkModeToggle } from "@/features/utils/ui";

import { AdminProfile } from "@/entities/user/ui";

import { useSession } from "@/shared/model";

export const Header = () => {
  const user = useSession();

  return (
    <header className="media-padding-x flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <h1>
          <Link href="/" aria-labelledby="메인 페이지로 이동">
            abonglog
          </Link>
        </h1>
        <SideBar />
      </div>
      <div className="flex items-center gap-2">
        {user && (
          <>
            <Link
              href="/write"
              className="text-md p-2 text-gray-400 hover:bg-secondary"
            >
              글 쓰기
            </Link>
            <Link
              className="flex items-end gap-2 p-2 hover:bg-secondary"
              href="/auth"
            >
              <AdminProfile size="sm" />
              <p className="text-xs text-gray-400">{user.email}</p>
            </Link>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};
