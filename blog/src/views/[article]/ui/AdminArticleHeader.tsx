"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { useDeleteArticle } from "@/entities/article/model";

interface AdminArticleHeaderProps {
  articleId: string;
}

/**
 * 해당 페이지는 로그인 한 (어드민) 유저에게만 보이는 헤더 컴포넌트로
 *
 * 글삭제, 글 수정 기능이 존재 합니다.
 */
export const AdminArticleHeader: React.FC<AdminArticleHeaderProps> = ({
  articleId
}) => {
  const router = useRouter();
  const { mutate: deleteArticle } = useDeleteArticle();

  const handleDelete = () => {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
      deleteArticle(articleId, {
        onSuccess: () => {
          alert("게시글이 제거되었습니다.");
          router.back();
        }
      });
    }
  };

  return (
    <div className="mb-2 flex justify-end gap-2 border-b pb-2 text-gray-500">
      <button className="hover:text-red-500" onClick={handleDelete}>
        글 삭제
      </button>
      <Link className="hover:text-blue-500" href={`/write/${articleId}`}>
        글 수정
      </Link>
    </div>
  );
};
