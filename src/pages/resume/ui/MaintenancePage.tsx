"use client";

import { AnimatedGradientBackground } from "@/shared/ui";
import Link from "next/link";
import { LinkChevronIcon } from "@/shared/ui";
import { useLocale } from "@/entities/locale";

export default function MaintenancePage() {
  const { toggleLocale } = useLocale();
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatedGradientBackground />
      <div className="relative z-10 flex h-full flex-col items-center justify-start gap-10 px-4 pt-32 text-center">
        <h1 className="animate-delay-400 animate-fade-in-up text-base font-bold text-white opacity-0 sm:text-xl md:text-2xl">
          죄송합니다. 새로운 이력서로 돌아오겠습니다.
        </h1>
        <div className="flex gap-4">
          <button
            className="text-link animate-delay-400 animate-fade-in-up inline-flex items-center gap-2 text-base opacity-0 sm:text-xl md:text-2xl hover:[&>*:first-child]:underline"
            onClick={toggleLocale}
          >
            <span>영문 이력서보기</span>
            <LinkChevronIcon className="w-2 md:w-auto" />
          </button>
          <Link
            className="text-link animate-delay-400 animate-fade-in-up inline-flex items-center gap-2 text-base opacity-0 sm:text-xl md:text-2xl hover:[&>*:first-child]:underline"
            href="/messages"
          >
            <span>이력서 요청하기</span>
            <LinkChevronIcon className="w-2 md:w-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
