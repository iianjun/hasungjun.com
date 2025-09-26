import { TopNavBar } from "@/widgets/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Hasung Jun",
};

export default async function Layout({ children }: LayoutProps<"/about">) {
  return (
    <>
      <TopNavBar />
      <main className="min-h-svh">{children}</main>
    </>
  );
}
