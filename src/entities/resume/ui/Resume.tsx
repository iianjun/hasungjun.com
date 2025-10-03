import Link from "next/link";
import React from "react";

const Resume: React.FC = () => {
  return (
    <div className="flex items-center justify-center pb-20 md:pt-6 md:pb-[5.5rem]">
      <div className="animate-resume-visible font-arial leading-[1.167]">
        <div className="bg-white pt-[.875rem] md:h-[52.625rem] md:w-[37.1875rem]">
          <div className="flex flex-col items-center gap-1 px-[1.125rem] py-[.375rem]">
            <h1 className="text-[1.125rem] font-bold">Hasung (Ian) Jun</h1>
            <div className="text-center">
              <p className="text-[.6875rem]">
                Full-stack developer | Seoul, South Korea | 010-9463-2817
              </p>
              <div className="text-[.6875rem]">
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
          <div className="flex flex-col gap-[.3125rem] px-[1.125rem] py-[.375rem]">
            <h2 className="text-[.75rem] font-bold uppercase">Education</h2>
            <div className="border-t-[1px] border-black" />
            <div className="space-y-[.1875rem] text-[.6875rem]">
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
              <ul className="list-disc space-y-[.1875rem] pl-5">
                <li>Dual major in Technological Systems Management</li>
                <li>
                  2021 Fall Academic Excellence Scholarship [Full tuition]
                </li>
                <li>2020 Academic Excellence Scholarship [Half tuition]</li>
                <li>2019 Academic Excellence Scholarship [Full tuition]</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-[.3125rem] px-[1.125rem] py-[.375rem]">
            <h2 className="text-[.75rem] font-bold uppercase">Experience</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="flex flex-col gap-5 text-[.6875rem]">
              <div className="space-y-[.1875rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>WorkOnward</b> | <span>Remote</span>
                  </h3>
                  <i>May 2022 - March 2025</i>
                </div>
                <p>Full-Stack Developer</p>
                <ul className="list-disc space-y-[.1875rem] pl-5">
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
              <div className="space-y-[.1875rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Soft Squared</b> | <span>Remote</span>
                  </h3>
                  <i>November 2023 - May 2024</i>
                </div>
                <p>Frontend developer (Contract)</p>
                <ul className="list-disc space-y-[.1875rem] pl-5">
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
              <div className="space-y-[.1875rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Moornomo</b> | <span>Incheon, South Korea</span>
                  </h3>
                  <i>June 2021 - July 2021</i>
                </div>
                <p>Frontend developer (Contract)</p>
                <ul className="list-disc space-y-[.1875rem] pl-5">
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
          <div className="flex flex-col gap-[.3125rem] px-[1.125rem] py-[.375rem]">
            <h2 className="text-[.75rem] font-bold uppercase">Projects</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="flex flex-col gap-5 text-[.6875rem]">
              <div className="space-y-[.1875rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Tiny Desk</b> | <span>A bookmark organizer web app</span>
                  </h3>
                  <i>March 2021 - June 2021</i>
                </div>
                <ul className="list-disc space-y-[.1875rem] pl-5">
                  <li>Lead developer on a small team of four members</li>
                  <li>Developed the frontend</li>
                  <li>Developed Chrome and Firefox Extension</li>
                </ul>
              </div>
              <div className="space-y-[.1875rem]">
                <div className="flex justify-between">
                  <h3>
                    <b>Suni</b> | <span>iOS scheduling app</span>
                  </h3>
                  <i>Dec 2020 - Feb 2021</i>
                </div>
                <ul className="list-disc space-y-[.1875rem] pl-5">
                  <li>200+ downloads</li>
                  <li>Used by over 10% of the students at the school</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[.3125rem] px-[1.125rem] py-[.375rem]">
            <h2 className="text-[.75rem] font-bold uppercase">Skills</h2>
            <div className="border-t-[1px] border-black"></div>
            <div className="grid grid-cols-2 text-[.6875rem]">
              <ul className="list-disc space-y-[.1875rem] pl-5">
                <li>React</li>
                <li>TypeScript</li>
                <li>Cascading Style Sheets (CSS)</li>
                <li>GraphQL</li>
                <li>MongoDB</li>
              </ul>
              <ul className="list-disc space-y-[.1875rem] pl-5">
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
