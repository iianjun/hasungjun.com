import { MessagePage } from "@/pages/messages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Hasung Jun",
  description:
    "Let's connect! Feel free to reach out about projects, opportunities, or even just to say hi. I'm always happy to chat.",
  keywords: [
    "contact",
    "email",
    "message",
    "get in touch",
    "hire",
    "collaboration",
  ],
  openGraph: {
    title: "Messages | Hasung Jun",
    description:
      "Let's connect! Feel free to reach out about projects, opportunities, or even just to say hi. I'm always happy to chat.",
    url: "https://www.hasungjun.com/messages",
    siteName: "Hasung Jun Portfolio",
    images: [
      {
        url: "https://www.hasungjun.com/og-image.png",
        width: 420,
        height: 420,
        alt: "Contact Hasung Jun",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Messages | Hasung Jun",
    description:
      "Let's connect! Feel free to reach out about projects, opportunities, or even just to say hi.",
    images: ["https://www.hasungjun.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  return <MessagePage />;
}
