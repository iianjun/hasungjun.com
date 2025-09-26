import { MessagePage } from "@/pages/messages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Hasung Jun",
};

export default async function Page() {
  return <MessagePage />;
}
