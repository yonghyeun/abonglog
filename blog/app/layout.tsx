import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { ServiceProvider } from "@/app/ServiceProvider";

import { SideBar } from "@/widgets/navigate/ui";

import { getCurrentUserData } from "@/entities/user/model";

import { Profile } from "@/shared/ui/Profile";

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
      <ServiceProvider>
        <body className="flex min-h-screen flex-col bg-primary">
          <Header />
          <main className="flex flex-grow flex-col">
            {modal}
            {children}
          </main>
          <Footer />
        </body>
      </ServiceProvider>
    </html>
  );
};

const Header = async () => {
  const user = await getCurrentUserData();

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
      {user && (
        <div className="flex items-center gap-2">
          <Link
            href="/write"
            className="text-md p-2 text-gray-400 hover:bg-secondary"
          >
            글 쓰기
          </Link>
          <Link
            className="flex items-end gap-2 rounded-md p-2 hover:bg-secondary"
            href="/auth"
          >
            <Profile
              size="sm"
              src={`${user.profileUrl}`}
              alt={`${user.email} 의 프로필 이미지`}
            />
            <p className="text-xs text-gray-400">{user.email}</p>
          </Link>
        </div>
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
