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
  title: "Home | Hasung Jun",
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
