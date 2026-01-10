import { Header, Footer } from "@/widgets/navigate/ui";
import "./globals.css";
import { ServiceProvider, defaultMetadata } from "@/app";
import { HydrationBoundary } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";

import { DarkModeInitializeScript } from "@/features/utils/ui";

import { getArticleMetaListPerSeries } from "@/entities/article/model";

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
              <main className="flex flex-grow flex-col pt-4 sm:pt-6 md:pt-8">
                {modal}
                {children}
                <Analytics />
              </main>
              <Footer />
            </Suspense>
          </HydrationBoundary>
        </ServiceProvider>
      </body>
    </html>
  );
};

export default RootLayout;
