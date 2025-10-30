import { BottomNavBar } from "@/widgets/dock";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
