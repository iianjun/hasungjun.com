import type { Metadata } from "next";
import { ResumePage } from "@/pages/resume";

export const metadata: Metadata = {
  title: "Resume | Hasung Jun",
  description:
    "View and download the resume. Full Stack Developer with expertise in React, Next.js, and modern web technologies.",
  keywords: [
    "resume",
    "CV",
    "download resume",
    "professional experience",
    "Full Stack Developer",
  ],
  openGraph: {
    title: "Resume | Hasung Jun",
    description:
      "View and download my professional resume. Full Stack Developer with expertise in modern web technologies",
    url: "https://www.hasungjun.com/resume",
    siteName: "Hasung Jun Portfolio",
    images: [
      {
        url: "https://www.hasungjun.com/og-image.png",
        width: 420,
        height: 420,
        alt: "Hasung Jun Resume",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Hasung",
    lastName: "Jun",
  },
  twitter: {
    card: "summary",
    title: "Resume | Hasung Jun",
    description: "View and download my professional resume",
    images: ["https://www.hasungjun.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  return <ResumePage />;
}
