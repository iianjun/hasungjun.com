import {
  OutlineDownloadIcon,
  OutlineGitHubIcon,
  OutlineLinkedInIcon,
} from "@/shared/ui";

import { Route } from "next";

export const LINKS: {
  href: Route;
  label: string;
  icon: React.ComponentType<{ width: number; height: number }>;
}[] = [
  {
    href: "https://www.linkedin.com/in/hasungjun",
    label: "LinkedIn",
    icon: OutlineLinkedInIcon,
  },
  {
    href: "https://github.com/iianjun",
    label: "GitHub",
    icon: OutlineGitHubIcon,
  },
  {
    href: "/resume_hasung_jun_${locale}.pdf",
    label: "Download Resume",
    icon: OutlineDownloadIcon,
  },
];
