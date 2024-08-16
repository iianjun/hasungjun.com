/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV !== "production" ? false : true,
  // },
};

export default nextConfig;
