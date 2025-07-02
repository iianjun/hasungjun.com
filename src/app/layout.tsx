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
          "bg-background overflow-x-hidden antialiased",
        )}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
