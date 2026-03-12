import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.szeltech.hu" }],
        destination: "https://szeltech.hu/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);