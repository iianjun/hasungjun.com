import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import fs from "fs";
import path from "path";

const generateFsdOptimizeImports = (): string[] => {
  const slicesToScan = [
    "entities",
    "features",
    "shared",
    "widgets",
    "app",
    "pages",
  ];
  const baseSrcPath = path.join(process.cwd(), "src");
  const aliasPrefix = "@/";

  const optimizedImports: string[] = [];

  for (const slice of slicesToScan) {
    const slicePath = path.join(baseSrcPath, slice);

    try {
      if (!fs.existsSync(slicePath) || !fs.statSync(slicePath).isDirectory()) {
        continue;
      }

      const entries = fs.readdirSync(slicePath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const alias = `${aliasPrefix}${slice}/${entry.name}`;
          optimizedImports.push(alias);
        }
      }
    } catch (error) {
      console.error(
        `[Next.js Config] '${slicePath}' 스캔 중 오류 발생:`,
        error,
      );
      throw error;
    }
  }

  console.info("[Next.js Config] optimizePackageImports:", optimizedImports);
  return optimizedImports;
};

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
  experimental: {
    optimizePackageImports: generateFsdOptimizeImports(),
  },
};

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts");
export default withNextIntl(nextConfig);
