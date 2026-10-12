// import type { NextConfig } from "next";
// import createNextIntlPlugin from "next-intl/plugin";
// const withNextIntl = createNextIntlPlugin();

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "admin.ozzip.pl",
//       },
//     ],
//   },
// };

// export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.ozzip.pl",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
