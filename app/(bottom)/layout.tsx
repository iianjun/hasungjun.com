import { BottomNavBar } from "@/widgets/navbar";

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
