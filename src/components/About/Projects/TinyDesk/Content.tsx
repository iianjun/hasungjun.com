import Link from "next/link";
import React from "react";

const Content = () => {
  return (
    <section className="mx-auto mb-20 w-full max-w-screen-lg">
      <p className="text-xl text-slate-400">
        TinyDesk is designed to provide a quick and efficient way for users to
        organize their bookmarks on modern browsers. The project emphasizes
        allowing users to customize their start page with advanced options not
        typically available by default in most browsers. This project was guided
        by{" "}
        <Link
          href="https://www.linkedin.com/in/alexckuhn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link underline"
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
  );
};

export default Content;
