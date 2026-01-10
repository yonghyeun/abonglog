import React, { ReactNode } from "react";

import { Button } from "@/shared/ui/Button";

// 이미지 타입 정의
interface ImageItem {
  src: string;
  alt: string;
}

// 메인 ImageGrid 컴포넌트
interface ImageGridProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className = "" }: ImageGridProps) => {
  return (
    <ul className={`flex-grow overflow-y-auto py-2 ${className}`}>
      {children}
    </ul>
  );
};

// 제목 컴포넌트
interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title = ({ children, className = "" }: TitleProps) => {
  return <p className={`text-gray-400 ${className}`}>{children}</p>;
};

// 이미지 컨테이너 컴포넌트
interface ContainerProps {
  children: ReactNode;
  className?: string;
  gridCols?: 2 | 3 | 4 | 5;
}

const Container = ({
  children,
  className = "",
  gridCols = 3
}: ContainerProps) => {
  return (
    <li className={`grid grid-cols-${gridCols} gap-2 ${className}`}>
      {children}
    </li>
  );
};

// 개별 이미지 아이템 컴포넌트
interface ItemProps {
  image: ImageItem;
  selectedImageUrl: string | null;
  onSelectImage?: (src: string) => void;
  className?: string;
}

const Item = ({
  image,
  selectedImageUrl,
  onSelectImage,
  className = ""
}: ItemProps) => {
  const { src, alt } = image;

  return (
    <Button
      variant="outlined"
      size="sm"
      onClick={() => onSelectImage?.(src)}
      className={`flex flex-col justify-between ${
        src === selectedImageUrl ? "border-brand-primary" : "border-gray-300"
      } ${className}`}
    >
      {/* TODO 이미지 최적화 직접 구현하기 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full object-cover" />
      <p className="text-ellipsis text-sm text-gray-400">{alt}</p>
    </Button>
  );
};

export const ImageGrid = Object.assign(Wrapper, { Title, Container, Item });
