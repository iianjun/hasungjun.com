import Link from "next/link";
import React from "react";

const Resume: React.FC = () => {
  return (
    <div className="flex items-center justify-center pb-32 sm:pb-[8.8rem] sm:pt-10">
      <div className="animate-resume-visible font-arial leading-[1.167]">
        <div className="h-[calc(100svh-13rem)] w-screen overflow-auto bg-white pt-[1.4rem] sm:h-[84.2rem] sm:w-[59.5rem]">
          <div className="flex flex-col items-center gap-[.4rem] px-[1.8rem] py-[.6rem]">
            <h1 className="text-[1.8rem] font-bold">Hasung (Ian) Jun</h1>
            <div className="text-center">
              <p className="text-[1.1rem]">
                Frontend developer | Moreno Valley, CA | 631-202-8920
              </p>
              <div className="text-[1.1rem]">
                <Link
                  className="text-[#0047ff] underline"
                  href="https://www.linkedin.com/in/hasungjun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/hasungjun
                </Link>{" "}
                |{" "}
                <Link
                  className="text-[#0047ff] underline"
                  href="https://www.github.com/iianjun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/iianjun
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[.5rem] px-[1.8rem] py-[.6rem]">
            <h2 className="text-[1.2rem] font-bold uppercase">Education</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="space-y-[.3rem] text-[1.1rem]">
              <div className="flex justify-between">
                <h3>
                  <b>Stony Brook University</b> | <span>Stony Brook, NY</span>
                </h3>
                <i>May 2022</i>
              </div>
              <div className="flex justify-between">
                <p>Bachelor of Science in Computer Science</p>
                <p>GPA: 3.65 / 4.0</p>
              </div>
              <ul className="list-disc space-y-[.3rem] pl-8">
                <li>Dual major in Technological Systems Management</li>
                <li>
                  2021 Fall Academic Excellence Scholarship [Full tuition]
                </li>
                <li>2020 Academic Excellence Scholarship [Half tuition]</li>
                <li>2019 Academic Excellence Scholarship [Full tuition]</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-[.5rem] px-[1.8rem] py-[.6rem]">
            <h2 className="text-[1.2rem] font-bold uppercase">Experience</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="flex flex-col gap-[2rem] text-[1.1rem]">
              <div className="space-y-[.3rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>WorkOnward</b> | <span>Remote</span>
                  </h3>
                  <i>May 2022 - Present</i>
                </div>
                <p>Full-Stack Developer</p>
                <ul className="list-disc space-y-[.3rem] pl-8">
                  <li>
                    Created, maintained, and redesigned front-end and back-end
                    code for 40+ pages
                  </li>
                  <li>
                    Developed corresponding APIs using Node.js, Fastify,
                    GraphQL, and MongoDB
                  </li>
                  <li>
                    Developed a map-based job search page that became the
                    destination for 50% of daily users
                  </li>
                  <li>
                    Implemented Stripe integration, creating robust systems for
                    invoices, subscriptions, and payments
                  </li>
                  <li>
                    Enhanced and optimized multiple MongoDB queries, resulting
                    in a performance increase and a reduction in execution time
                    by up to 30%
                  </li>
                </ul>
              </div>
              <div className="space-y-[.3rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Soft Squared</b> | <span>Remote</span>
                  </h3>
                  <i>November 2023 - May 2024</i>
                </div>
                <p>Frontend developer (Contract)</p>
                <ul className="list-disc space-y-[.3rem] pl-8">
                  <li>
                    Developed client’s e-commerce order management pages using
                    Next.js, TypeScript, and Tailwind
                  </li>
                  <li>
                    Implemented admin functionalities for the client including
                    stock and product management pages with React
                  </li>
                </ul>
              </div>
              <div className="space-y-[.3rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Moornomo</b> | <span>Incheon, South Korea</span>
                  </h3>
                  <i>June 2021 - July 2021</i>
                </div>
                <p>Frontend developer (Contract)</p>
                <ul className="list-disc space-y-[.3rem] pl-8">
                  <li>
                    Developed various functionalities for the client’s
                    electronic document management system using React and Redux
                  </li>
                  <li>
                    Implemented a 3D model viewer system, which was done in less
                    than 1/10th the previously budgeted time
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[.5rem] px-[1.8rem] py-[.6rem]">
            <h2 className="text-[1.2rem] font-bold uppercase">Projects</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="flex flex-col gap-[2rem] text-[1.1rem]">
              <div className="space-y-[.3rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Tiny Desk</b> | <span>A bookmark organizer web app</span>
                  </h3>
                  <i>March 2021 - June 2021</i>
                </div>
                <ul className="list-disc space-y-[.3rem] pl-8">
                  <li>Lead developer on a small team of four members</li>
                  <li>Developed the frontend</li>
                  <li>Developed Chrome and Firefox Extension</li>
                </ul>
              </div>
              <div className="space-y-[.3rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Suni</b> | <span>iOS scheduling app</span>
                  </h3>
                  <i>Dec 2020 - Feb 2021</i>
                </div>
                <ul className="list-disc space-y-[.3rem] pl-8">
                  <li>200+ downloads</li>
                  <li>Used by over 10% of the students at the school</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[.5rem] px-[1.8rem] py-[.6rem]">
            <h2 className="text-[1.2rem] font-bold uppercase">Skills</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="grid grid-cols-2 text-[1.1rem]">
              <ul className="list-disc space-y-[.3rem] pl-8">
                <li>React</li>
                <li>TypeScript</li>
                <li>Cascading Style Sheets (CSS)</li>
                <li>GraphQL</li>
                <li>MongoDB</li>
              </ul>
              <ul className="list-disc space-y-[.3rem] pl-8">
                <li>JavaScript</li>
                <li>Next.js</li>
                <li>REST</li>
                <li>Node.js</li>
                <li>SQL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resume;
