import Image from "next/image";
import Link from "next/link";
import React from "react";
import classNames from "classnames";

const ITEMS = [
  { name: "Terminal", src: "/svg/dock-terminal.svg", link: "/" },
  { name: "About", src: "/dock-about.png", link: "/about" },
  { name: "Resume", src: "/svg/dock-resume.svg", link: "/resume" },
  { name: "Contact", src: "/svg/dock-contact.svg", link: "/contact" },
  {
    name: "LinkedIn",
    src: "/svg/dock-linkedin.svg",
    link: "https://www.linkedin.com/in/hasungjun/",
  },
  {
    name: "GitHub",
    src: "/svg/dock-github.svg",
    link: "https://github.com/iianjun",
  },
];
const BottomNavBar: React.FC<{ position?: "left" | "bottom" }> = ({
  position = "bottom",
}) => {
  return (
    <nav
      id="nav-dock"
      className={classNames({
        "bottom-0 w-full animate-nav-fade-up pb-4": position === "bottom",
        "left-0 top-0 h-full w-fit animate-nav-fade-right flex-col pl-4":
          position === "left",
      })}
    >
      <ul
        className={classNames(
          "flex rounded-[2rem] border border-[#45474b] bg-[#53535340] p-[.8rem] backdrop-blur-[1.3rem]",
          {
            "flex-col": position === "left",
          },
        )}
      >
        {ITEMS.map((item, index) => (
          <li
            key={item.name}
            className={classNames("group", {
              "pr-0": position === "left",
              "pb-[1.2rem]": position === "left" && ITEMS.length - 1 !== index,
              "pr-[1.2rem]":
                position === "bottom" && ITEMS.length - 1 !== index,
            })}
          >
            <div className="relative h-20 w-20 transition-all duration-100 ease-smooth group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
              <Link
                href={item.link}
                target={item.link.startsWith("/") ? undefined : "_blank"}
                rel={
                  item.link.startsWith("/") ? undefined : "noopener noreferrer"
                }
              >
                <Image
                  width="50"
                  height="0"
                  className="h-full w-full"
                  src={item.src}
                  alt={item.name}
                />
              </Link>
              <span
                className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
                role="tooltip"
              >
                {item.name}
              </span>
            </div>
          </li>
        ))}
        {/* <li
          className={classNames("group pr-[1.2rem]", {
            "pb-[1.2rem] pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link href="/">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-terminal.svg"
                alt="terminal"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              Terminal
            </span>
          </div>
        </li>
        <li
          className={classNames("group pr-[1.2rem]", {
            "pb-[1.2rem] pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link href="/about">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/dock-about.png"
                alt="about-me"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              About
            </span>
          </div>
        </li>
        <li
          className={classNames("group pr-[1.2rem]", {
            "pb-[1.2rem] pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link href="/resume">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-resume.svg"
                alt="resume"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              Resume
            </span>
          </div>
        </li>
        <li
          className={classNames("group pr-[1.2rem]", {
            "pb-[1.2rem] pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link href="/contact">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-contact.svg"
                alt="contact"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              Contact
            </span>
          </div>
        </li>
        <li
          className={classNames("group pr-[1.2rem]", {
            "pb-[1.2rem] pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link
              href="https://www.linkedin.com/in/hasungjun/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-linkedin.svg"
                alt="linkedin"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              LinkedIn
            </span>
          </div>
        </li>
        <li
          className={classNames("group", {
            "pr-0": position === "left",
          })}
        >
          <div className="ease-smooth relative h-20 w-20 transition-all duration-100 group-hover:-mt-4 group-hover:h-24 group-hover:w-24">
            <Link
              href="https://github.com/iianjun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-github.svg"
                alt="github"
              />
            </Link>
            <span
              className="invisible absolute bottom-[calc(100%_+_1.5rem)] left-1/2 -translate-x-1/2 transform rounded-[0.8rem] border border-black bg-[#27282a] px-[1.2rem] py-[.4rem] text-center text-[1.2rem] text-white shadow-[inset_0_0_0_1px_#47484a] group-hover:visible"
              role="tooltip"
            >
              GitHub
            </span>
          </div>
        </li> */}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
