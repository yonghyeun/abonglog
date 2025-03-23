import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 2025/03/23
    // 현재 나는 Image 태그를 썸네일 이미지에만 사용하고 있기에
    // 불필요하게 크거나 작은 크기의 이미지를 .next/cache/image 에 저장하지 않도록 하기 위해
    // 필요한 이미지의 타입 (모바일 , 태블릿 , 피시) 만 저장하도록 deviceSizes 를 설정했다.
    // 또한 500,800,1080 외의 다른 이미지들을 저장하지 않도록 imageSizes 를 빈 배열로 설정했다.
    deviceSizes: [500, 800, 1080],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bnhwpfqowipytfquprwl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  }
};

export default nextConfig;
