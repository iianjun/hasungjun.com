import { BottomNavBar } from "@/widgets/navbar";

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
