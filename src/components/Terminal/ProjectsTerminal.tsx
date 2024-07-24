import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import React from "react";
const ProjectsTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <h2 className="text-9xl text-slate-200">Projects</h2>
      <p className="text-[1.8rem] text-slate-200">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sit amet luctus
        venenatis lectus magna fringilla. Sodales neque sodales ut etiam sit.
        Egestas congue quisque egestas diam. Sagittis eu volutpat odio facilisis
        mauris sit amet massa.
      </p>
    </FloatingTerminal>
  );
};

export default ProjectsTerminal;
