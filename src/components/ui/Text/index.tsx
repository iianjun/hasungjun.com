import React, { HTMLAttributes } from "react";

import classNames from "classnames";
import styles from "@/styles/ui/text.module.scss";
interface TextProps extends HTMLAttributes<HTMLElement> {
  variant: "headline" | "subhead" | "body" | "caption";
}

export const Text: React.FC<Readonly<TextProps>> = ({
  variant,
  children,
  className,
  ...rest
}) => {
  if (variant === "headline") {
    return (
      <h2 className={classNames(styles.headline, className)} {...rest}>
        {children}
      </h2>
    );
  } else if (variant === "subhead") {
    return (
      <p className={classNames(styles.subhead, className)} {...rest}>
        {children}
      </p>
    );
  } else if (variant === "body") {
    return (
      <p className={classNames(styles.body, className)} {...rest}>
        {children}
      </p>
    );
  } else {
    return (
      <p className={classNames(styles.caption, className)} {...rest}>
        {children}
      </p>
    );
  }
};
