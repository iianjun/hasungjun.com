import Chevron from "./chevron.svg";
import Cross from "./cross.svg";
import { HTMLAttributes } from "react";
import Plus from "./plus.svg";
import TLDRTermsTypographyLogo from "./tldrterms-typo-logo.svg";

interface SVGProps extends HTMLAttributes<SVGElement> {
  width?: number | string;
  height?: number | string;
}
export const ChevronIcon: React.FC<SVGProps> = ({ ...rest }) => {
  return <Chevron {...rest} />;
};

export const TLDRTermsTypographyLogoIcon: React.FC<SVGProps> = ({
  ...rest
}) => {
  return <TLDRTermsTypographyLogo {...rest} />;
};

export const PlusIcon: React.FC<SVGProps> = ({ ...rest }) => {
  return <Plus {...rest} />;
};
export const CrossIcon: React.FC<SVGProps> = ({ ...rest }) => {
  return <Cross {...rest} />;
};
