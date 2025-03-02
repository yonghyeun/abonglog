"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        staleTime: 1000 * 30
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
