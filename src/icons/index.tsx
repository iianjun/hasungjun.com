import Chevron from "./chevron.svg";
import { HTMLAttributes } from "react";
import TLDRTermsTypographyLogo from "./tldrterms-typo-logo.svg";
export const ChevronIcon: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
  ...rest
}) => {
  return <Chevron {...rest} />;
};

export const TLDRTermsTypographyLogoIcon: React.FC<
  HTMLAttributes<HTMLSpanElement>
> = ({ ...rest }) => {
  return <TLDRTermsTypographyLogo {...rest} />;
};
