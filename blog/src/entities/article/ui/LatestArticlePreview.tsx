import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface LatestArticlePreviewProps {
  postId: number;
  title: string;
  description: string;
  createdAt: string; // toDateString 형태
  thumbnailUrl: string;
}

export const LatestArticlePreview: React.FC<LatestArticlePreviewProps> = ({
  postId,
  title,
  thumbnailUrl,
  description,
  createdAt
}) => {
  return (
    <section className="media-padding-x flex min-h-96 items-center gap-4 bg-secondary py-12">
      <div className="flex h-full w-1/2 flex-col justify-center">
        <PreviewContainer>
          <p className="text-base text-sky-blue">최근 게시글</p>
          <h1>{title}</h1>
        </PreviewContainer>
        <PreviewContainer className="text-gray-500">
          <p className="line-clamp-3">{description}</p>
          <p className="text-end">{createdAt}</p>
        </PreviewContainer>
        <Link
          href={`/blog/${postId}`}
          className="mt-3 w-fit rounded-md bg-sky-blue px-6 py-3 text-base font-semibold text-white hover:bg-bright-blue"
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
