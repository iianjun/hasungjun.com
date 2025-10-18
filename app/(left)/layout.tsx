import { BottomNavBar } from "@/widgets/dock";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNavBar position="left" />
    </>
  );
}
