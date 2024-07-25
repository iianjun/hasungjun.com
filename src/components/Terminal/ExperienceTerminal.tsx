import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import React from "react";
const ExperienceTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              May 2022 - Present
            </h2>
            <p className="text-[1.6rem] text-slate-400">Full-Stack developer</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-[1.6rem] text-white">WorkOnward</h3>
            <p className="text-[1.6rem] text-slate-400">Remote</p>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              November 2023 - May 2024
            </h2>
            <p className="text-[1.6rem] text-slate-400">
              Frontend developer (Contract)
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-[1.6rem] text-white">Soft Squared </h3>
            <p className="text-[1.6rem] text-slate-400">Remote</p>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              June 2021 - July 2021
            </h2>
            <p className="text-[1.6rem] text-slate-400">
              Frontend developer (Contract)
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-[1.6rem] text-white">Moornomo</h3>
            <p className="text-[1.6rem] text-slate-400">Incheon, South Korea</p>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default ExperienceTerminal;
