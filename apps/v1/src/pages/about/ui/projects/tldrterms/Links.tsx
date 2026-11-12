import Link from "next/link";
import { LinkChevronIcon } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface LinksProps {
  className?: string;
  smallerOnMobile?: boolean;
}
export default function Links({ className, smallerOnMobile }: LinksProps) {
  return (
    <div className={className}>
      <Link
        className={cn(
          "text-link inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl hover:[&>*:first-child]:underline",
          {
            "text-base": smallerOnMobile,
          },
        )}
        href="https://www.tldrterms.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Visit</span>
        <LinkChevronIcon className="w-2 md:w-auto" />
      </Link>
      <Link
        className={cn(
          "text-link inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl hover:[&>*:first-child]:underline",
          {
            "text-base": smallerOnMobile,
          },
        )}
        href="https://github.com/iianjun/tldrterms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>GitHub</span>
        <LinkChevronIcon className="w-2 md:w-auto" />
      </Link>
    </div>
  );
}
