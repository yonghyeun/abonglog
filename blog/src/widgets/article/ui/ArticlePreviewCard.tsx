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
    <section className="transition-bg flex h-full flex-col gap-2 border px-4 py-2 duration-100 hover:bg-gray-100 hover:shadow-sm">
      {/* 이미지 컴포넌트 */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="article-thumbnail"
          className="aspect-video h-2/3 w-full object-cover"
        />
      ) : (
        <div className="aspect-video h-2/3 w-full bg-gray-200" />
      )}
      {/* 태그 리스트  */}
      <List.UnOrder>
        {tags.map((tag) => (
          <List.Item key={tag}>
            <TagChip>{tag}</TagChip>
          </List.Item>
        ))}
      </List.UnOrder>

      {/* 글 제목과 시리즈 이름 */}
      <div>
        <h3>{title}</h3>
        <p className="text-sm text-gray-500">{seriesName}</p>
      </div>

      {/* 소개글 & 게시자 정보 */}
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <p className="w-full break-words">{description}</p>
        {/* break-words 추가 */}
        <div className="flex gap-2">
          <AdminProfile size="sm" />
          <div className="text-xs">
            <p>yonghyeun</p>
            <time>{new Date(updatedAt).toLocaleString()}</time>
          </div>
        </div>
      </div>
    </section>
  );
};
