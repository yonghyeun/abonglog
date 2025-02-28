import { tagStyleArray } from "../config";
import { capitalizeFirstLetter } from "../util";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Profile } from "@/shared/ui/Profile";

interface PostCardProps {
  postId: number;
  title: string;
  description: string;
  createdAt: string; // toDateString 형태
  thumbnailUrl: string;
  tags: { id: number; name: string }[];
}

/**
 * PostCard 는 Grid layout 에서 사용 되어야 한다.
 */
export const PostCard: React.FC<PostCardProps> = ({
  postId,
  title,
  thumbnailUrl,
  tags,
  description,
  createdAt
}) => {
  return (
    <Link
      className="flex aspect-video flex-col gap-4 rounded-md px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      href={`/post/${postId}`}
    >
      {/* 이미지 */}
      <div className="relative h-2/3">
        <Image
          src={thumbnailUrl}
          alt={`${title}의 썸네일 이미지`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* tag */}
      <ul className="text-semibold flex flex-wrap gap-2 text-sm">
        {tags.map(({ id, name }) => (
          <li
            key={id}
            className={`${tagStyleArray[id % tagStyleArray.length]} font semibold rounded-md px-2 py-1`}
          >
            {capitalizeFirstLetter(name)}
          </li>
        ))}
      </ul>
      {/* 제목 */}
      <h3>{title}</h3>
      <div className="flex flex-col gap-4 text-sm text-gray-500">
        {/* 설명 */}
        <p className="line-clamp-2">{description}</p>
        <div className="flex gap-2">
          {/* TODO 필수적으로 author 이미지로 변경 하기  */}
          <Profile size="sm" src="/images/profile.jpg" alt="프로필 이미지" />
          <div className="text-xs">
            <p>yonghyeun</p>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
      <div />
    </Link>
  );
};
