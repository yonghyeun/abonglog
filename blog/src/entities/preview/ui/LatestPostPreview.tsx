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
    <section className="bg-secondary media-padding-x flex min-h-96 items-center gap-4 py-12">
      <div className="flex h-full w-1/2 flex-col justify-center">
        <PreviewContainer>
          <p className="text-sky-blue text-base">최근 게시글</p>
          <h1>{title}</h1>
        </PreviewContainer>
        <PreviewContainer className="text-gray-500">
          <p className="line-clamp-3">{description}</p>
          <p className="text-end">{createdAt}</p>
        </PreviewContainer>
        <Link
          href={`/blog/${postId}`}
          className="bg-sky-blue hover:bg-bright-blue mt-3 w-fit rounded-md px-6 py-3 text-base font-semibold text-white"
        >
          게시글 보러 가기
        </Link>
      </div>
      <div className="relative my-auto min-h-96 w-1/2">
        <Image src={thumbnailUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
    </section>
  );
};

const PreviewContainer: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className = "" }) => {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
};
