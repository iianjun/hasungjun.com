import { TopNavBar } from "@/widgets/dock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Hasung Jun",
  description:
    "Learn about my background, professional experience, projects, and technical skills as a Full Stack Developer.",
  keywords: [
    "about",
    "projects",
    "skills",
    "experience",
    "Full Stack Developer",
    "web development",
  ],
  openGraph: {
    title: "About Me | Hasung Jun",
    description:
      "Learn about my background, professional experience, projects, and technical skills as a Full Stack Developer.",
    url: "https://www.hasungjun.com/about",
    siteName: "Hasung Jun",
    images: [
      {
        url: "https://www.hasungjun.com/og-image.png",
        width: 420,
        height: 420,
        alt: "About Hasung Jun",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Hasung",
    lastName: "Jun",
  },
  twitter: {
    card: "summary",
    title: "About Me | Hasung Jun",
    description:
      "Learn about my projects, technical skills, and professional experience",
    images: ["https://www.hasungjun.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Layout({ children }: LayoutProps<"/about">) {
  return (
    <>
      <TopNavBar />
      <main className="min-h-svh">{children}</main>
    </>
  );
}
