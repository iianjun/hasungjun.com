import "@/styles/globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Hasung Jun",
};

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <style>
        {`
      body {
       background: #282a35;
      }
    `}
      </style>
    </>
  );
}
