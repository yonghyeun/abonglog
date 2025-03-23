import Image from "next/image";
import React from "react";

import { TagChip } from "@/entities/tag/ui";
import { AdminProfile } from "@/entities/user/ui";

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
    <section className="transition-bg flex h-full flex-col justify-between rounded-lg border shadow-md hover:bg-secondary hover:shadow-lg">
      {/* 이미지 컴포넌트 */}
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={`${title}의 썸네일 이미지`}
          className="aspect-video w-full rounded-t-lg object-cover"
          width={300}
          height={169}
          sizes="(max-width: 500px) 300px, 600px"
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
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <p className="text-sm text-secondary">{seriesName}</p>
          </div>
          <p className="break-words text-sm text-secondary">{description}</p>
        </div>
      </div>
      {/* 소개글 & 게시자 정보 */}
      <div className="flex flex-col gap-4 p-2 text-sm text-secondary">
        <div className="flex items-center gap-2">
          <AdminProfile size="sm" />
          <div className="text-xs">
            <p className="font-medium">yonghyeun</p>
            <time>{new Date(updatedAt).toLocaleString()}</time>
          </div>
        </div>
      </div>
    </section>
  );
};
