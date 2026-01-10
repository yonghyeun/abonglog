import { Header } from "./Header";
import "./globals.css";
import { ServiceProvider, defaultMetadata } from "@/app";
import { HydrationBoundary } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";

import { DarkModeInitializeScript } from "@/features/utils/ui";

import { getArticleMetaListPerSeries } from "@/entities/article/model";

import { GithubIcon, HumanIcon } from "@/shared/config";
import { prefetchQueryInServer } from "@/shared/model";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-sans",
  weight: "45 920",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export const metadata = defaultMetadata;

const RootLayout: React.FC<RootLayoutProps> = async ({ children, modal }) => {
  const sidebarState = await prefetchQueryInServer(getArticleMetaListPerSeries);

  return (
    <html
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
      lang="ko"
    >
      <body className="flex min-h-screen flex-col bg-app text-primary">
        <DarkModeInitializeScript />
        <ServiceProvider>
          <HydrationBoundary state={sidebarState}>
            <Suspense fallback={null}>
              <Header />
              <main className="flex flex-grow flex-col">
                {modal}
                {children}
                <Analytics />
              </main>
            </Suspense>
          </HydrationBoundary>
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
        <p className="mb-2">
          공부한 내용을 기록하고 함께 성장하고 싶어 만든 두 번째 블로그입니다
        </p>
        <p className="mb-2">주로 웹개발과 관련된 내용을 포스팅합니다.</p>
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
