import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  reactStrictMode: false,
  typedRoutes: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: { icon: true } }],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: unknown) =>
      (rule as { test: RegExp }).test?.test?.(".svg"),
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts");
export default withNextIntl(nextConfig);
