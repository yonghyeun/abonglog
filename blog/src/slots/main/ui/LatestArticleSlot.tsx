"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetLatestArticle } from "@/entities/article/model";
import { TagChip } from "@/entities/tag/ui";
import { AdminProfile } from "@/entities/user/ui";

import { List } from "@/shared/ui/List";

export const LatestArticleSlot = () => {
  const {
    data: {
      id,
      title,
      author,
      seriesName,
      description,
      createdAt,
      thumbnailUrl,
      tags
    }
  } = useGetLatestArticle();

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* preview */}
      <div className="flex w-full flex-col justify-between gap-2 sm:w-1/2">
        <div className="flex flex-col gap-2">
          <p className="font-base text-purple-500 dark:text-purple-200">
            최근 게시글
          </p>
          {/* 글 제목 */}
          <h2 className="text-3xl font-bold">{title}</h2>
          {/* 시리즈 제목 */}
          <p className="text-purple-500 dark:text-purple-300">{seriesName}</p>
          {/* 태그 리스트 */}
          <List.UnOrder>
            {tags.map((tag) => (
              <List.Item key={tag}>
                <TagChip>{tag!}</TagChip>
              </List.Item>
            ))}
          </List.UnOrder>
        </div>
        {/* 글 설명 */}
        <p className="h-24 text-ellipsis text-sm/6 text-secondary">
          {description}
        </p>

        {/* 프로필 사진과 제목 및 시간 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AdminProfile size="sm" />
            <div className="text-xs text-secondary">
              <p className="mb-1">{author}</p>
              <time dateTime={new Date(createdAt).toISOString()}>
                {new Date(createdAt).toLocaleString()}
              </time>
            </div>
          </div>

          <Link
            href={`/article/${id}`}
            className="w-fit rounded-md bg-purple-700 px-4 py-2 text-sm text-white hover:bg-purple-900"
            aria-label={`게시글 ${title}로 이동`}
          >
            게시글로 이동
          </Link>
        </div>
      </div>

      {/* image */}
      <div className="relative aspect-video w-full sm:w-1/2">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title} 의 썸네일 이미지`}
            className="rounded-lg object-cover"
            fill
            priority={true}
            quality={100}
          />
        ) : (
          // TODO 기본 이미지 생성하기
          <div>empty</div>
        )}
      </div>
    </div>
  );
};
