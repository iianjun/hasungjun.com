import BottomNavBar from "@/components/BottomNavBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
