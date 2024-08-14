import MessageApp from "@/components/MessageApp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Hasung Jun",
};

export default async function ContactPage() {
  return (
    <main className="h-svh overflow-x-hidden pt-0 md:flex md:justify-center md:pt-[10%] xl:pt-[5%]">
      <MessageApp />
    </main>
  );
}
