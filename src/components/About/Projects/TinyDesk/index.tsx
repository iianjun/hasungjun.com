import HeroGroup from "@/components/About/Projects/TinyDesk/HeroGroup";
import Intro from "@/components/About/Projects/TinyDesk/Intro";
import Link from "next/link";
import React from "react";

const TinyDesk = () => {
  return (
    <>
      <HeroGroup />
      <Intro />
      <section className="mx-auto mb-10 w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <p className="text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
          TinyDesk is designed to provide a quick and efficient way for users to
          organize their bookmarks on modern browsers. The project emphasizes
          allowing users to customize their start page with advanced options not
          typically available by default in most browsers. This project was
          guided by{" "}
          <Link
            href="https://www.linkedin.com/in/alexckuhn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link underline transition-colors duration-200 hover:text-blue-500"
          >
            Alex Khun
          </Link>
          , an ex-Apple Engineer. Under his mentorship, I took on the role of
          Product Owner, where I managed the schedule, set timelines, and
          prioritized tasks. I also contributed to both the front-end and
          back-end, maintaining, fixing, and developing features such as a to-do
          list, notes, bookmarks, a weather widget, and more.
        </p>
      </section>
    </>
  );
};

export default TinyDesk;
