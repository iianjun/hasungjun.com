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
    <section className="mx-auto mb-20 w-full max-w-screen-lg px-4 text-center sm:px-6 lg:px-8">
      <h3
        className="bg-big-sur-gradient lg:text-2.5xl inline-block w-fit !bg-clip-text text-xl font-bold text-transparent transition-opacity duration-600 ease-linear will-change-[opacity] md:text-2xl"
        ref={title}
      >
        Tiny Desk
      </h3>
      <h4
        className="text-3.5xl xs:text-4.5xl md:text-5.5xl mt-2 font-semibold text-slate-100 transition-opacity duration-600 ease-linear will-change-[opacity]"
        ref={headline}
      >
        New Browsing Experience
      </h4>
      <div
        ref={subhead}
        className="transition-opacity duration-600 ease-linear will-change-[opacity]"
      >
        <p className="mx-auto my-4 text-lg leading-relaxed text-slate-200 sm:text-xl md:max-w-[85%] md:text-2xl">
          Maximize your browsing efficiency. Change the way you organize your
          bookmarks and use your homepage.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            className="text-link inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl hover:[&>*:first-child]:underline"
            href="https://www.tinydesk.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Visit</span>
            <ChevronIcon className="w-2 md:w-auto" />
          </Link>
          <Link
            className="text-link inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl hover:[&>*:first-child]:underline"
            href="https://github.com/janarosmonaliev/tinydesk_legacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <ChevronIcon className="w-2 md:w-auto" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Intro;
