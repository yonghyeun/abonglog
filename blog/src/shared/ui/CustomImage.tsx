import Head from "next/head";
import React from "react";
import ReactDOM from "react-dom";

const PhotoPreLoad = (srcSet: string, sizes: string, imageType: string) => {
  if (ReactDOM.preload) {
    ReactDOM.preload(srcSet, {
      as: "image",
      type: imageType,
      fetchPriority: "high",
      imageSrcSet: srcSet,
      imageSizes: sizes
    });
    return null;
  } else {
    return (
      <Head>
        <link key={srcSet} rel="preload" imageSrcSet={srcSet} />
      </Head>
    );
  }
};

interface PhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes: string;
  srcSet: string;
  priority?: boolean;
}

export const CustomImage: React.FC<PhotoProps> = ({
  src,
  alt,
  sizes,
  srcSet,
  priority = false,
  ...props
}) => {
  const type = src.split(".").pop();

  if (!type) {
    throw new Error(
      "적합한 이미지 경로가 아닙니다. 이미지 경로는 반드시 파일 확장자를 포함해야 합니다."
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {priority && PhotoPreLoad(srcSet, sizes, type)}
    </>
  );
};
