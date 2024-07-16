import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import React from "react";
const AboutTermimal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal animation hasContentAbove {...rest}>
      <div className="flex flex-col gap-6 p-12">
        <h1 className="text-8xl text-slate-200">Education</h1>
      </div>
    </FloatingTerminal>
  );
};

export default AboutTermimal;
