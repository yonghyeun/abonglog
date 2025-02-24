import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // !TODO : 서버 연결 후 제거하기
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "feature-sliced.design",
        search: ""
      }
    ]
  }
};

export default nextConfig;
