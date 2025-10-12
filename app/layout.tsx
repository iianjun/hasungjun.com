import "@/app/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import StoreProvider from "@/app/providers/store-provider";
import { cn } from "@/shared/lib";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const d2coding = localFont({
  src: "./fonts/D2Coding.woff2",
  variable: "--font-d2coding",
});

export const metadata: Metadata = {
  title: "Hasung Jun",
  description:
    "Portfolio website of Hasung Jun, a Full Stack Developer specializing in web development. View my projects, skills, and experience.",
  keywords: [
    "Hasung Jun",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Hasung Jun" }],
  openGraph: {
    title: "Hasung Jun",
    description:
      "Portfolio website showcasing my web development projects and skills",
    url: "https://www.hasungjun.com",
    siteName: "Hasung Jun Portfolio",
    images: [
      {
        url: "https://www.hasungjun.com/og-image.png",
        width: 420,
        height: 420,
        alt: "Hasung Jun Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hasung Jun",
    description:
      "Portfolio website showcasing my web development projects and skills",
    images: ["https://www.hasungjun.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#232431",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, d2coding.variable)}>
      <body className={"bg-background overflow-x-hidden antialiased"}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
