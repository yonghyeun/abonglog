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

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
} & ImageSize;

type ImageSize =
  | {
      sizes?: never;
      size?: 250 | 400 | 1000;
    }
  | {
      sizes?: string;
      size?: never;
    };

/**
 * makeSrcSet 은 이미지의 경로가 다음과 같이 주어진 경우를 가정합니다.
 * src = "https://{storageUrl}/articleId/{imageName}-{width}.jpg"
 * 실제 supabaseStorage는 articleId/{imageName}-{width}/{size}.extesnion 형태로 저장되어 있습니다.
 */
const makeSrcSet = (src: string) => {
  const image = src.split("/").pop();

  if (!image) {
    throw new Error("올바르지 않은 이미지 경로입니다.");
  }

  const [name, extension] = image.split(".");

  const srcHead = src.split(name)[0];
  const possibleSize = [250, 400, 1000].filter(
    (size) => +name.split("-") > size
  );

  return possibleSize
    .map((size) => `${srcHead}/${name}/${size}.${extension} ${size}w`)
    .join(", ");
};

/**
 * 해당 컴포넌트는 next/image 를 사용하지 않고
 * 이미지 최적화를 적용하기 위해 생성한 컴포넌트입니다.
 * 이미지 size set은 다음과 같습니다.
 * sm : 250w
 * md : 400w
 * lg : 1000w
 *
 */
export const Photo: React.FC<PhotoProps> = ({
  src,
  alt,
  loading = "lazy",
  sizes = "(max-width: 250px) 250px, (max-width: 600px) 600px, (max-width: 1000px) 1000px, 1200px",
  size,
  className = "",
  priority = false
}) => {
  const type = src.split(".").pop();

  if (type === "gif") {
    // TODO gif 이미지 처리
    return null;
  }

  const srcSet = makeSrcSet(src);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        srcSet={srcSet}
        alt={alt}
        decoding="async"
        loading={loading}
        sizes={size ? `(max-width: ${size}px) ${size}px, 100vw` : sizes}
        className={className}
      />
      {priority && PhotoPreLoad(srcSet, sizes, `image/${type}`)}
    </>
  );
};
