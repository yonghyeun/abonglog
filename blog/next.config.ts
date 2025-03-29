import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [1200, 1600, 2400],
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
