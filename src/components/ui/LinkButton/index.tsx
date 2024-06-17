import Link, { LinkProps } from "next/link";
import React, { HTMLProps } from "react";

import classNames from "classnames";
import styles from "@/styles/ui/btn.module.scss";

interface CustomProps {
  variant: "fill" | "outline";
}
export const LinkButton: React.FC<
  LinkProps & HTMLProps<HTMLAnchorElement> & CustomProps
> = ({ className, variant, href, ...rest }) => {
  return (
    <Link
      href={href}
      className={classNames(styles.link, className, {
        [styles.fill]: variant === "fill",
        [styles.outline]: variant === "outline",
      })}
      {...rest}
    ></Link>
  );
};
