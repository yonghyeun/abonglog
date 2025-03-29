import Link from "next/link";

import { SideBar } from "@/widgets/navigate/ui";

import { DarkModeToggle } from "@/features/utils/ui";

export const Header = () => {
  return (
    <header className="media-padding-x sticky top-0 z-50 flex items-center justify-between bg-primary py-4">
      <div className="flex items-center gap-2">
        <h1>
          <Link href="/" aria-labelledby="메인 페이지로 이동">
            abonglog
          </Link>
        </h1>
        <SideBar />
      </div>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
      </div>
    </header>
  );
};
