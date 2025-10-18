"use client";

import EnResume from "./EnResume";
import { SupportedLocale } from "@/entities/locale";
import dynamic from "next/dynamic";
const KoResume = dynamic(() => import("./KoResume"), { ssr: false });

export default function ResumeWrapper({ locale }: { locale: SupportedLocale }) {
  return locale === "en" ? <EnResume /> : <KoResume />;
}
