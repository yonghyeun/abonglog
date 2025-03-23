import { Header } from "./Header";
import "./globals.css";

import { ServiceProvider } from "@/app/ServiceProvider";

import { DarkModeInitializeScript } from "@/features/utils/ui";

import { GithubIcon, HumanIcon } from "@/shared/config";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, modal }) => {
  return (
    <html suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-primary">
        <DarkModeInitializeScript />
        <ServiceProvider>
          <Header />
          <main className="flex flex-grow flex-col">
            {modal}
            {children}
          </main>
          <Footer />
        </ServiceProvider>
      </body>
    </html>
  );
};

const Footer = () => (
  <footer className="media-padding-x py-4 text-secondary">
    {/* introduce */}
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex-grow">
        <h3 className="mb-2">abonglog</h3>
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
          <GithubIcon />
          Github
        </a>
        <span className="flex items-center gap-2 text-sm">
          <HumanIcon /> ttddcc119@naver.com
        </span>
      </div>
    </div>
    <p className="mt-2 text-center italic">
      @ 2025 abonglog All rights reserved
    </p>
  </footer>
);

export default RootLayout;
