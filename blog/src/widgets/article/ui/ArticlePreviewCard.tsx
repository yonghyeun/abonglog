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
    <section className="transition-bg flex h-full flex-col gap-4 rounded-lg border p-4 shadow-md hover:bg-secondary hover:shadow-lg">
      {/* 이미지 컴포넌트 */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="article-thumbnail"
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        <div className="aspect-video w-full rounded-lg bg-gray-200" />
      )}
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
        <h3 className="text-primary text-xl font-semibold">{title}</h3>
        <p className="text-secondary text-sm">{seriesName}</p>
      </div>

      {/* 소개글 & 게시자 정보 */}
      <div className="text-secondary flex flex-col gap-4 text-sm">
        <p className="w-full break-words">{description}</p>
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
