import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import StoreProvider from "@/components/StoreProvider";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Hasung Jun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "overflow-x-hidden bg-gradient-to-br from-[#1a1b27] to-[#2b2c3a] antialiased",
        )}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
