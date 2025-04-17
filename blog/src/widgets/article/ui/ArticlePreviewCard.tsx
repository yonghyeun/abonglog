import Image from "next/image";
import React from "react";

import { TagChip } from "@/entities/tag/ui";

import { List } from "@/shared/ui/List";

interface ArticlePreviewCardProps {
  thumbnailUrl: string | null;
  tags: string[];
  seriesName: string;
  title: string;
  description: string;
  updatedAt: string;
}

export const ArticlePreviewCard: React.FC<ArticlePreviewCardProps> = ({
  thumbnailUrl,
  tags,
  title,
  seriesName,
  description,
  updatedAt
}) => {
  return (
    <section className="hover:border-primary flex h-full flex-col justify-between rounded-lg bg-secondary transition-all duration-200 hover:shadow-lg hover:dark:shadow-gray-700/50">
      {/* 이미지 컴포넌트 */}
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={`${title}의 썸네일 이미지`}
          className="aspect-video w-full rounded-t-lg object-cover"
          width={300}
          height={169}
          sizes="600px"
          quality={100}
        />
      ) : (
        <div className="aspect-video w-full rounded-t-lg bg-gray-200" />
      )}
      <div className="flex flex-grow flex-col justify-between gap-4 p-2">
        <div className="flex flex-col gap-4">
          {/* 태그 리스트  */}
          <List.UnOrder className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <List.Item key={tag}>
                <TagChip>{tag}</TagChip>
              </List.Item>
            ))}
          </List.UnOrder>

          {/* 글 제목과 시리즈 이름 */}
          <div>
            <p className="text-xl font-semibold text-primary">{title}</p>
            <p className="text-sm text-secondary">{seriesName}</p>
          </div>
          <p className="break-words text-sm/6 text-secondary">{description}</p>
        </div>
      </div>
      {/* 소개글 & 게시자 정보 */}
      <time className="w-full p-2 text-xs text-secondary">
        {new Date(updatedAt).toLocaleString()}
      </time>
    </section>
  );
};
