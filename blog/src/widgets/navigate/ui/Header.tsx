import Image from "next/image";
import Link from "next/link";

import { SideBar } from "@/widgets/navigate/ui";

import { DarkModeToggle } from "@/features/utils/ui";

import { Container } from "@/shared/ui/layout";

export const Header = () => {
  return (
    <header className="bg-surface-1/80 sticky top-0 z-50 w-full border-b border-default backdrop-blur-md">
      <Container
        variant="listing"
        className="flex h-16 items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <SideBar />
          <Link
            href="/"
            aria-label="메인 페이지로 이동"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo.svg"
              alt="abonglog logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-body-l font-bold text-primary">abonglog</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* 추후 검색 버튼 등 추가 공간 */}
          <DarkModeToggle />
        </div>
      </Container>
    </header>
  );
};
