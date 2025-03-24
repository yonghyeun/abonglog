import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [750, 900, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [],
    remotePatterns:
      process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "https",
              hostname: "**",
              port: "",
              pathname: "**"
            }
          ]
        : [
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
