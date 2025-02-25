import { SideBar } from "./ui";
import { Noto_Sans } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const notoSans = Noto_Sans({
  display: "swap"
});

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html className={notoSans.className}>
      <body className="flex min-h-screen flex-col bg-primary">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

const Header = () => (
  <header className="media-padding-x flex items-center gap-2 py-4">
    <h1>abonglog</h1>
    <SideBar />
  </header>
);

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
