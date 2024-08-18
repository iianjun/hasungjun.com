import { ChevronIcon } from "@/icons";
import Link from "next/link";
import React from "react";
import { useIsInView } from "@/hooks/useIsInView";

const Intro = () => {
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute("style", "opacity: 1");
    } else {
      entry.target.setAttribute("style", "opacity: 0");
    }
  };

  const [title] = useIsInView<HTMLHeadingElement>({
    options: { rootMargin: "0px 0px -30% 0px" },
    callback: handleIntersection,
  });
  const [headline] = useIsInView<HTMLHeadingElement>({
    options: { rootMargin: "0px 0px -30% 0px" },
    callback: handleIntersection,
  });
  const [subhead] = useIsInView<HTMLDivElement>({
    options: { rootMargin: "0px 0px -30% 0px" },
    callback: handleIntersection,
  });

  return (
    <section className="mx-auto mb-20 w-full max-w-screen-lg px-10 md:px-0">
      <h3
        className="bg-big-sur-gradient !bg-clip-text text-center text-[3.5rem] font-bold text-transparent transition-opacity duration-600 ease-linear will-change-[opacity]"
        ref={title}
      >
        Tiny desk
      </h3>
      <h4
        className="mt-[.625rem] text-center text-[5rem] font-semibold leading-[1.05] text-slate-100 transition-opacity duration-600 ease-linear will-change-[opacity]"
        ref={headline}
      >
        New browsing experience
      </h4>

      <div
        ref={subhead}
        className="transition-opacity duration-600 ease-linear will-change-[opacity]"
      >
        <p className="text-slate mx-auto my-[1.125rem] max-w-[85%] text-center text-[1.75rem] text-slate-200">
          Maximize your browsing efficiency. Change the way you organize your
          bookmarks and use your homepage
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            className="inline-flex items-center gap-2 text-center text-[1.75rem] text-link hover:[&>*:first-child]:underline"
            href="https://www.tinydesk.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Visit</span>
            <ChevronIcon />
          </Link>
          <Link
            className="inline-flex items-center gap-2 text-center text-[1.75rem] text-link hover:[&>*:first-child]:underline"
            href="https://github.com/janarosmonaliev/tinydesk_legacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <ChevronIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Intro;
