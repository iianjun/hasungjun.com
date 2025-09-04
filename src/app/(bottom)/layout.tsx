import BottomNavBar from "@/components/BottomNavBar";

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
