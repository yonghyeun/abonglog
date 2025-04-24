"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useDeleteArticle } from "@/entities/article/model";
import { ARTICLE_QUERY_KEY } from "@/entities/article/model/articleQueryKey";

import { useSession } from "@/shared/model";
import { useNotify } from "@/shared/ui/notify";

interface AdminArticleHeaderProps {
  articleId: string;
  seriesName?: string;
}

/**
 * 해당 페이지는 로그인 한 (어드민) 유저에게만 보이는 헤더 컴포넌트로
 *
 * 글삭제, 글 수정 기능이 존재 합니다.
 */
export const AdminArticleHeader: React.FC<AdminArticleHeaderProps> = ({
  articleId,
  seriesName
}) => {
  const user = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutate: deleteArticle } = useDeleteArticle();
  const { notifyTopLeft } = useNotify();

  if (!user) {
    return null;
  }

  const isTempArticle = pathname && pathname.includes("temp");

  const handleDelete = () => {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
      deleteArticle(
        { articleId: Number(articleId), seriesName },
        {
          onSuccess: () => {
            notifyTopLeft.success("게시글이 제거되었습니다.");
            queryClient.invalidateQueries({
              queryKey: ARTICLE_QUERY_KEY.default(
                isTempArticle ? "draft" : "published"
              )
            });

            queryClient.invalidateQueries({
              queryKey: ARTICLE_QUERY_KEY.popularDefault()
            });

            router.back();
          }
        }
      );
    }
  };

  return (
    <div className="media-padding-x flex justify-end gap-2 pb-2 text-secondary">
      <button className="hover:text-red-500" onClick={handleDelete}>
        글 삭제
      </button>
      <Link className="hover:text-purple-500" href={`/write/${articleId}`}>
        글 수정
      </Link>
    </div>
  );
};
