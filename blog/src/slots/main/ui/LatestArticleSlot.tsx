"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetLatestArticle } from "@/entities/article/model";
import { TagChip } from "@/entities/tag/ui";

import { List } from "@/shared/ui/List";

export const LatestArticleSlot = () => {
  const {
    data: { id, title, seriesName, description, thumbnailUrl, tags }
  } = useGetLatestArticle();

  return (
    <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center">
      {/* preview */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            New Update
          </span>

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

        <p className="text-secondary/80 line-clamp-3 text-base leading-relaxed">
          {description}
        </p>

        <div className="flex items-center">
          <Link
            href={`/article/${id}`}
            className="hover:bg-brand-primary/90 group flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
            aria-label={`게시글 ${title}로 이동`}
          >
            Read Article
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* image */}
      <div className="relative aspect-video w-full flex-1 overflow-hidden rounded-2xl shadow-xl sm:h-full">
        {thumbnailUrl ? (
          <Link href={`/article/${id}`}>
            <Image
              src={thumbnailUrl}
              alt={`${title} 의 썸네일 이미지`}
              className="object-cover transition-transform duration-700 hover:scale-105"
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
