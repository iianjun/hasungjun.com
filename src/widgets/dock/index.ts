import dynamic from "next/dynamic";
const BottomNavBar = dynamic(() => import("./ui/BottomNavBar"), {
  ssr: false,
});
export { TopNavBar } from "./ui/TopNavBar";
export { BottomNavBar };
