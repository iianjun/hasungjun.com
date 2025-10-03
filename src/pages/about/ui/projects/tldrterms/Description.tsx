import { AnimatePresence, motion } from "framer-motion";
import { CrossIcon, PlusIcon } from "@/shared/ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsInView, useMediaQuery, useMounted } from "@/shared/lib";

import HoloImage from "@/pages/about/ui/projects/tldrterms/HoloImage";
import { cn } from "@/shared/lib";

const IS_DEV = process.env.NODE_ENV === "development";
type ControlType = "overview" | "problem" | "technical" | "features" | "impact";
const CONTROL_MAP: Record<
  ControlType,
  { title: string; content: string; phrase: string }
> = {
  overview: {
    title: "Overview",
    phrase:
      "AI-powered privacy analysis at your fingertips. Transform complex legal documents into clear, actionable insights.",
    content:
      "TL;DR Terms is a full-stack web application that empowers users to make informed decisions about digital services by providing AI-powered analysis of privacy policies and terms of service documents. Users simply input a URL, and the application generates a comprehensive grade and breakdown of potential privacy concerns, making complex legal language accessible to everyone.",
  },
  problem: {
    title: "Problem",
    phrase:
      "Hidden privacy risks in plain sight. Most users accept terms without understanding the consequences.",
    content:
      "In today's digital landscape, users routinely accept lengthy terms of service and privacy policies without reading them, often exposing themselves to significant privacy risks that could compromise their personal data and digital rights. This issue became particularly evident in South Korea when Roborock users discovered that their personal data was being collected and processed in China—information that was buried in the privacy policy but went unnoticed by most users until it became a public controversy.",
  },
  technical: {
    title: "Technical Implementation",
    phrase:
      "Built for scale, optimized for performance. Modern architecture meets intelligent processing.",
    content:
      "The application leverages Next.js for optimal SEO performance and server-side rendering, ensuring fast page loads and excellent search engine visibility while providing a seamless user experience across all devices. The robust backend architecture features RESTful API endpoints integrated with sophisticated AI processing pipelines, utilizing PostgreSQL for efficient data management and implementing advanced caching mechanisms to handle high-volume document analysis.",
  },
  features: {
    title: "Key Features",
    phrase:
      "Simplicity meets sophistication. Instant analysis with comprehensive results.",
    content:
      "URL-based Analysis allows users to input any privacy policy or terms of service URL for instant, comprehensive analysis without complex setup or technical knowledge. AI-Powered Grading utilizes sophisticated algorithms to evaluate documents and provide clear, actionable grades with detailed explanations, while the intuitive interface makes complex legal information accessible to users of all technical backgrounds.",
  },
  impact: {
    title: "Impact",
    phrase:
      "Protecting privacy, one policy at a time. Empowering users to make informed digital decisions.",
    content:
      "TL;DR Terms bridges the gap between complex legal documentation and user understanding, enabling individuals to make informed decisions about their digital privacy and data security. The project demonstrates how technology can be leveraged to solve real-world problems and protect user rights in an increasingly connected world, fostering greater digital literacy and awareness.",
  },
};
function Loader() {
  const didRun = useRef(false);
  const [ref, isInView] = useIsInView<HTMLDivElement>({
    options: {
      threshold: 0.5,
    },
  });
  const [progress, setProgress] = useState(IS_DEV ? 100 : 0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInView || didRun.current || IS_DEV) return;
    didRun.current = true;
    let currentProgress = 0;
    interval.current = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval.current as NodeJS.Timeout);
      }
      setProgress(currentProgress);
    }, 20);
  }, [isInView]);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  const isDone = progress === 100;

  return (
    <motion.div
      ref={ref}
      className="flex-center absolute inset-0 z-10 rounded-3xl bg-black"
      animate={{
        visibility: isDone ? "hidden" : "visible",
        opacity: isDone ? 0 : 1,
      }}
      transition={{
        duration: 0.4,
        delay: 0.5,
      }}
    >
      <div className="bg-progress/40 relative h-2 w-35 rounded-full">
        <motion.div
          className={`h-full rounded-full bg-white`}
          initial={false}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
function Control({
  title,
  phrase,
  active,
  onActive,
}: {
  title: string;
  phrase: string;
  active: boolean;
  onActive: () => void;
}) {
  const isMounted = useMounted()();
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isLg = useMediaQuery("(min-width: 64rem)");
  const isMd = useMediaQuery("(min-width: 48rem)");

  const isSm = !isLg && !isMd;
  const expandedWidth = useMemo(() => {
    if (isLg) return 424;
    if (isMd) return 374;
    return 400;
  }, [isLg, isMd]);

  const calculateContentHeight = useCallback(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;
    const contentHeight = contentElement.clientHeight;
    setHeight(contentHeight);
  }, []);

  const calculateButtonWidth = useCallback(() => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;
    const buttonWidth = buttonElement.clientWidth;
    setWidth(buttonWidth);
  }, []);

  useEffect(() => {
    calculateContentHeight();
    const controller = new AbortController();
    window.addEventListener("resize", calculateContentHeight, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [calculateContentHeight]);

  useEffect(() => {
    if (isMounted) calculateButtonWidth();
  }, [isMounted, calculateButtonWidth, isSm]);

  return (
    <motion.li
      initial={false}
      className="group relative h-14 flex-shrink-0 rounded-[1.75rem] backdrop-blur-lg"
      animate={{
        height: active ? height : undefined,
        width: active ? expandedWidth : width,
      }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        mass: 1.25,
        damping: 23,
      }}
    >
      <div className="flex-center pointer-events-none absolute h-full w-full">
        <span
          className={cn(
            "bg-control/72 z-[-1] h-full w-full rounded-[1.75rem] transition-colors ease-linear",
            {
              "group-hover:bg-control/92": !active,
            },
          )}
        ></span>
      </div>
      <motion.button
        ref={buttonRef}
        onClick={onActive}
        className={cn(
          "relative z-[1] flex h-14 cursor-pointer items-center gap-3.5 rounded-[1.75rem] pr-7 pl-3.5 text-sm font-semibold whitespace-nowrap text-white md:text-base",
          {
            "pointer-events-none": active,
          },
        )}
        disabled={active}
        aria-hidden={active}
        animate={{
          opacity: !active ? 1 : 0,
        }}
        transition={{
          duration: !active ? 0.4 : 0,
          delay: !active ? 0.4 : 0,
        }}
      >
        <PlusIcon />
        {title}
      </motion.button>
      <div className={"absolute top-0 left-0 h-full w-full"}>
        <div className="h-full w-full overflow-hidden">
          <motion.div
            aria-hidden={!active}
            className={cn("invisible w-100 p-6 md:w-93.5 md:p-7 lg:w-106", {
              visible: active,
            })}
            animate={{
              opacity: active ? 1 : 0,
            }}
            transition={{
              duration: active ? 0.7 : 0,
              delay: active ? 0.3 : 0,
            }}
            ref={contentRef}
          >
            <p className="text-sm text-white md:text-[1.0625rem]">
              <strong>{title}.</strong> {phrase}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.li>
  );
}
export default function Description() {
  const [clicked, setClicked] = useState<ControlType | null>(null);
  const isLg = useMediaQuery("(min-width: 64rem)");
  const isMd = useMediaQuery("(min-width: 48rem)");

  const isSm = !isLg && !isMd;

  const expandedWidth = useMemo(() => {
    if (isLg) return 424;
    if (isMd) return 374;
    return 400;
  }, [isLg, isMd]);
  return (
    <div className="relative mx-auto mb-10 flex h-190 w-full max-w-7xl items-center">
      <div className="absolute top-4 right-4 z-[3]">
        <motion.button
          onClick={() => setClicked(null)}
          className="flex-center bg-control/72 size-9 rounded-full"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          disabled={!clicked}
          aria-hidden={!clicked}
          animate={{
            opacity: clicked ? 1 : 0,
            visibility: clicked ? "visible" : "hidden",
          }}
        >
          <CrossIcon className="text-white" width={12} height={12} />
        </motion.button>
      </div>
      <div className="absolute z-[-1] h-full w-full bg-black xl:rounded-3xl"></div>
      <Loader />
      <div className="z-[2] flex h-full w-full items-end md:block md:h-auto md:w-3/10 md:pl-5 lg:pl-24">
        <div className="sticky bottom-0 flex h-57.5 flex-col justify-end overflow-hidden pb-5 md:h-auto md:overflow-visible md:pb-0">
          <ul
            className={
              "hide-scrollbar inline-flex flex-nowrap items-end gap-4 overflow-auto pl-5 md:relative md:flex-col md:items-start md:overflow-visible md:pl-0"
            }
          >
            {Object.keys(CONTROL_MAP).map((key) => (
              <Control
                key={key}
                active={clicked === key}
                onActive={() => setClicked(key as ControlType)}
                title={CONTROL_MAP[key as ControlType].title}
                phrase={CONTROL_MAP[key as ControlType].phrase}
              />
            ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            key={clicked}
            initial={{
              opacity: 0,
              visibility: "hidden",
              transform: "matrix(0.8, 0, 0, 0.8, 200, 0)",
            }}
            animate={{
              opacity: 1,
              visibility: "visible",
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              transition: {
                duration: 0.4,
                delay: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              visibility: "hidden",
              transform: "matrix(0.8, 0, 0, 0.8, -200, 0)",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="absolute z-1 p-5"
            style={{
              left: isSm
                ? undefined
                : `${((expandedWidth + (isLg ? 96 : 20)) / 16).toFixed(2)}rem`,
            }}
          >
            <p className="font-semibold text-slate-300 md:text-xl lg:text-2xl">
              {CONTROL_MAP[clicked].content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={cn(
          "absolute top-0 right-0 left-0 h-full w-full md:left-3/10 md:w-7/10",
          {
            "pointer-events-none": clicked,
          },
        )}
        animate={{
          opacity: clicked ? 0.5 : 1,
          filter: clicked ? "blur(4px)" : "blur(0)",
        }}
      >
        <div className="flex-center absolute inset-0 p-5">
          <HoloImage />
        </div>
      </motion.div>
    </div>
  );
}
