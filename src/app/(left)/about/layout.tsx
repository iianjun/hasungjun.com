import BottomNavBar from "@/components/BottomNavBar";
import TopNavBar from "@/components/TopNavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Hasung Jun",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavBar />
      {children}
      <BottomNavBar position="left" />
    </>
  );
}
