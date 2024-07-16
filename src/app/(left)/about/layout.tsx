import BottomNavBar from "@/components/BottomNavBar";
import TopNavBar from "@/components/TopNavBar";

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
