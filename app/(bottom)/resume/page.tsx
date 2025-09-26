import type { Metadata } from "next";
import { ResumePage } from "@/pages/resume";

export const metadata: Metadata = {
  title: "Resume | Hasung Jun",
};

export default async function Page() {
  return <ResumePage />;
}
