import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { SideBar } from "@/widgets/navigate/ui";

import { checkUserLoggedIn } from "@/shared/lib";

const notoSans = Noto_Sans({
  display: "swap"
});

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, modal }) => {
  return (
    <html className={notoSans.className}>
      <body className="flex min-h-screen flex-col bg-primary">
        <Header />
        <main className="flex flex-grow flex-col">
          {modal}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

const Header = async () => {
  const { isLoggedIn } = await checkUserLoggedIn();
  return (
    <header className="media-padding-x flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <h1>abonglog</h1>
        <SideBar />
      </div>
      {/* 로그인 모달 트리거 */}
      {isLoggedIn && (
        <Link
          href="/auth"
          className="rounded-md p-2 hover:bg-gray-200"
          aria-label="인증 페이지로 이동"
          replace
        >
          <FaRegUserCircle size="24" />
        </Link>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="media-padding-x bg-tertiary py-4 text-gray-200">
    {/* introduce */}
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex-grow">
        <h3>abonglog</h3>
        <p>
          공부한 내용을 기록하고 함께 성장하고 싶어 만든 두 번째 블로그입니다
        </p>
        <p>주로 웹개발과 관련된 내용을 포스팅합니다.</p>
      </div>

      <div className="flex flex-col justify-end">
        <a
          href="https://github.com/yonghyeun"
          className="flex items-center gap-2 text-sm"
        >
          <FaGithub />
          Github
        </a>
        <span className="flex items-center gap-2 text-sm">
          <MdOutlineEmail /> ttddcc119@naver.com
        </span>
      </div>
    </div>
    <p className="mt-2 text-center italic">
      @ 2025 abonglog All rights reserved
    </p>
  </footer>
);

export default RootLayout;
