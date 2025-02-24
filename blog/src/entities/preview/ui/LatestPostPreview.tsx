import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface LatestPostPreviewProps {
  postId: number;
  title: string;
  description: string;
  createdAt: string; // toDateString 형태
  thumbnailUrl: string;
}

export const LatestPostPreview: React.FC<LatestPostPreviewProps> = ({
  postId,
  title,
  thumbnailUrl,
  description,
  createdAt
}) => {
  return (
    <Link
      className="bg-secondary media-padding flex h-1/3 min-h-96 cursor-pointer items-center gap-4"
      href={`/posts/${postId}`}
    >
      <div className="flex h-full w-1/2 flex-col justify-center">
        <PreviewContainer>
          <p className="text-sky-blue text-md">최근 게시글</p>
          <h1>{title}</h1>
        </PreviewContainer>
        <PreviewContainer className="text-gray-500">
          <p className="line-clamp-3">{description}</p>
          <p className="text-end">{createdAt}</p>
        </PreviewContainer>
      </div>
      <div className="relative my-auto h-4/5 w-1/2">
        <Image
          src={thumbnailUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="h-1/2 w-1/2 rounded-md"
        />
      </div>
    </Link>
  );
};

const PreviewContainer: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className = "" }) => {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
};
