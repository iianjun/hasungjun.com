"use client";

import EnResume from "./EnResume";
import { Skeleton } from "@/shared/ui";
import { SupportedLocale } from "@/entities/locale";
import dynamic from "next/dynamic";
const KoResume = dynamic(() => import("./KoResume"), {
  ssr: false,
  loading: () => <Skeleton className="h-a4 w-full" />,
});

export default function ResumeWrapper({ locale }: { locale: SupportedLocale }) {
  return locale === "en" ? <EnResume /> : <KoResume />;
}
