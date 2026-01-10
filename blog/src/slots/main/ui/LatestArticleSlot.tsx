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
    <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center">
      {/* preview */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              Latest Post
            </span>
          </div>

          <Link href={`/article/${id}`} className="group block space-y-2">
            <h2 className="text-3xl font-extrabold text-primary transition-colors group-hover:text-brand-primary sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg font-medium text-secondary">{seriesName}</p>
          </Link>

          <List.UnOrder className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <List.Item key={tag}>
                <TagChip>{tag!}</TagChip>
              </List.Item>
            ))}
          </List.UnOrder>
        </div>

        <p className="line-clamp-3 text-base leading-relaxed text-secondary/80">
          {description}
        </p>

        {/* 프로필 사진과 제목 및 시간 */}
        <div className="flex items-center justify-between border-t border-default pt-6">
          <div className="flex items-center gap-3">
            <AdminProfile size="sm" />
            <div className="flex flex-col text-xs text-secondary">
              <span className="font-semibold text-primary">{author}</span>
              <time dateTime={new Date(createdAt).toISOString()}>
                {new Date(createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          <Link
            href={`/article/${id}`}
            className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:bg-surface-2 active:scale-95"
            aria-label={`게시글 ${title}로 이동`}
          >
            Read Article
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg sm:w-1/2">
        {thumbnailUrl ? (
          <Link href={`/article/${id}`}>
            <Image
              src={thumbnailUrl}
              alt={`${title} 의 썸네일 이미지`}
              className="object-cover transition-transform duration-500 hover:scale-105"
              fill
              priority={true}
              quality={100}
            />
          </Link>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-2 text-secondary">
            <span>No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};
