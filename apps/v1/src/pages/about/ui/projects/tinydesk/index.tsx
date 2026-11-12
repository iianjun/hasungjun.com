import HeroGroup from "./HeroGroup";
import Intro from "./Intro";
import Link from "next/link";
import { useIsInView } from "@/shared/lib";
import { useTranslations } from "next-intl";

const TinyDesk = () => {
  const t = useTranslations("about.projects.tinyDesk");
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute("style", "opacity: 1");
    } else {
      entry.target.setAttribute("style", "opacity: 0");
    }
  };
  const [ref] = useIsInView<HTMLDivElement>({
    options: { rootMargin: "0px 0px -30% 0px" },
    callback: handleIntersection,
  });
  return (
    <section>
      <HeroGroup />
      <Intro />
      <div
        className="mx-auto mb-10 w-full max-w-screen-lg px-4 transition-opacity duration-600 ease-linear will-change-[opacity] sm:px-6 lg:px-8"
        ref={ref}
      >
        <p className="text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
          {t.rich("description", {
            link: (chunks) => (
              <Link
                href="https://www.linkedin.com/in/alexckuhn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline transition-colors duration-200 hover:text-blue-500"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </section>
  );
};

export default TinyDesk;
