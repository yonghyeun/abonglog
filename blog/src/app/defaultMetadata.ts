import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  generator: "yonghyeun",
  applicationName: "abonglog",
  referrer: "origin-when-cross-origin",
  keywords: [
    "frontend",
    "web",
    "blog",
    "tech",
    "javascript",
    "typescript",
    "react",
    "nextjs"
  ],
  authors: [
    {
      name: "yonghyeun",
      url: "https://abonglog.me"
    }
  ],
  creator: "yonghyeun",
  publisher: "yonghyeun",
  robots: "index, follow",
  title: "abonglog",
  description:
    "웹 개발과 관련된 내용을 포스팅하는 블로그입니다. 고양이 이름이 애봉이예요",
  openGraph: {
    title: "abonglog",
    description:
      "웹 개발과 관련된 내용을 포스팅하는 블로그입니다. 고양이 이름이 애봉이예요",
    locale: "ko_KR",
    countryName: "Korea",
    images: [
      {
        url: "/images/ogLogo.png",
        width: 1200,
        height: 630,
        alt: "abonglog logo",
        type: "image/png"
      }
    ]
  }
};
