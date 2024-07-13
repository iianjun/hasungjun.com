import FloatingModal from "@/components/FloatingModal";
import { FloatingModalProps } from "@/components/FloatingModal";
import React from "react";
const AboutModal: React.FC<FloatingModalProps> = ({ ...rest }) => {
  return (
    <FloatingModal animation {...rest}>
      <p className="text-[1.8rem] text-slate-900">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sit amet luctus
        venenatis lectus magna fringilla. Sodales neque sodales ut etiam sit.
        Egestas congue quisque egestas diam. Sagittis eu volutpat odio facilisis
        mauris sit amet massa.
      </p>
    </FloatingModal>
  );
};

export default AboutModal;
