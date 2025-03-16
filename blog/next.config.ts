import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all"
          }
        ]
      }
    ];
  },

  images: {
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
