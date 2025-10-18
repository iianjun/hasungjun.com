import { BottomNavBar } from "@/widgets/dock";

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
