"use client";

import { SessionProvider } from "./SessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren } from "react";

/**
 * 해당 컴포넌트는 abonglog app 이 정상 작동하기 위한
 * 다양한 프로바이더를 제공합니다.
 */
export const ServiceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // hydration 이후 재요청을 방지하기 위해 최소한의 시간인
        // 30초만 staleTime 으로 설정합니다.
        staleTime: 1000 * 30,

        // rendering 을 block 하지 않고 promise 형태로 쿼리문을 이용할 수 있도록 합니다.
        experimental_prefetchInRender: true
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
