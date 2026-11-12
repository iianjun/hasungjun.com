import { LINKS } from "@/pages/resume";
import Link from "next/link";
import { Route } from "next";
import { cn } from "@/shared/lib";

export default function SideLinks() {
  return (
    <aside className="a4:fixed a4:top-auto a4:bottom-7.5 a4:left-7.5 a4:block a4:h-auto a4:px-0 top-2 left-4 z-[2] flex h-12.5 items-center px-4">
      <ul className="a4:flex-col-reverse a4:justify-start flex gap-7.5">
        {LINKS.map(({ href, label, icon: Icon }, index) => (
          <li
            key={label}
            className={cn("animate-fade-in relative opacity-0", {
              "animate-delay-0 after:animate-delay-200 before:animate-delay-200":
                index === 0,
              "animate-delay-400 after:animate-delay-600 before:animate-delay-600":
                index === 1,
              "animate-delay-800": index === 2,
              "after:a4:hidden after:border-gray-light after:animate-divider-width after:animate-delay-200 before:max-a4:hidden before:border-gray-light before:animate-divider-height before:animate-delay-200 before:absolute before:bottom-[calc(100%+0.5rem)] before:left-1/2 before:block before:-translate-x-1/2 before:border-r before:content-[''] after:absolute after:top-1/2 after:left-[calc(100%+0.5rem)] after:block after:-translate-y-1/2 after:border-t after:content-['']":
                index !== 2,
            })}
          >
            <Link
              href={href.replace("${locale}", "en") as Route}
              target="_blank"
              aria-label={label}
              rel="noopener noreferrer"
            >
              <Icon width={30} height={30} />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
