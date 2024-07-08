import "@/styles/globals.scss";

import BottomNavBar from "@/components/BottomNavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import classNames from "classnames";

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
        className={classNames(
          inter.className,
          "bg-gradient-to-br from-[#1a1b27] to-[#2b2c3a]",
        )}
      >
        {children}
        <BottomNavBar />
      </body>
    </html>
  );
}
