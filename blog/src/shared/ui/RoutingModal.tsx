"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface RoutingModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * 해당 모달의 열고 닫음은 routing state 를 통해 관리합니다.
 */
export const RoutingModal: React.FC<RoutingModalProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();

  useEffect(() => {
    // 모달이 열리고 나면 스크롤 못하도록 인터렉션 방지
    document.body.style.overflow = "hidden";
    return () => {
      // 모달이 닫히면 스크롤 가능하도록 변경
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      {/* 모달 내부 아이템 */}
      <div
        className="flex flex-col gap-2 rounded-2xl bg-primary px-8 py-6"
        {...props}
      >
        <header className="flex flex-grow justify-end">
          {/* 모달 닫기 버튼 */}
          <button
            className="rounded-sm p-2 text-gray-600 hover:bg-gray-200"
            onClick={() => router.back()}
          >
            <IoMdClose size="32" />
          </button>
        </header>
        {children}
      </div>
    </section>
  );
};
