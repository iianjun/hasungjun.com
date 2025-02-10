import Chevron from "./chevron.svg";
import { HTMLAttributes } from "react";
export const ChevronIcon: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
  ...rest
}) => {
  return (
    <span {...rest}>
      <Chevron style={{ width: "inherit", height: "inherit" }} />
    </span>
  );
};
