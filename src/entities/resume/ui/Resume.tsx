import Link from "next/link";
import React from "react";
import { cn } from "@/shared/lib";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-[.3125em] px-[1.125em] py-[.375em]">
      <h2 className="text-a4-base font-bold uppercase">{title}</h2>
      <div className="border-t-[1px] border-black" />
      {children}
    </section>
  );
};

const List = ({ data, className }: { data: string[]; className?: string }) => {
  return (
    <ul className={cn("list-disc space-y-[.1875em] pl-[1.25em]", className)}>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
const SectionItem = ({
  title,
  subTitle,
  date,
  children,
}: {
  title: string;
  subTitle: string;
  date: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-[.25em]">
      <div className="flex justify-between">
        <h3>
          <b>{title}</b> | <span>{subTitle}</span>
        </h3>
        <i>{date}</i>
      </div>
      {children}
    </div>
  );
};
const Resume: React.FC = () => {
  return (
    <div className="a4:pt-6 a4:pb-[5.5rem] flex items-center justify-center pb-20 print:p-0">
      <div className="animate-resume-visible font-arial leading-[1.167]">
        <div className="w-a4 h-a4 bg-white pt-[0.875em]">
          <div className="flex flex-col items-center gap-[.25em] py-[.375em]">
            <h1 className="text-a4-lg font-bold">Hasung (Ian) Jun</h1>
            <div className="text-center">
              <p className="text-a4-sm">
                Full-stack developer | Seoul, South Korea | 010-9463-2817
              </p>
              <div className="text-a4-sm">
                <Link
                  className="text-resume-link underline"
                  href="https://www.linkedin.com/in/hasungjun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/hasungjun
                </Link>{" "}
                |{" "}
                <Link
                  className="text-resume-link underline"
                  href="https://www.github.com/iianjun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/iianjun
                </Link>
              </div>
            </div>
          </div>
          <Section title="Education">
            <div className="text-a4-sm space-y-[.25em]">
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
              <ul className="list-disc space-y-[.1875em] pl-5">
                <li>Dual major in Technological Systems Management</li>
              </ul>
            </div>
          </Section>
          <Section title="Experience">
            <div className="text-a4-sm flex flex-col gap-[1.25em]">
              <SectionItem
                title="WorkOnward"
                subTitle="Remote"
                date="May 2022 - March 2025"
              >
                <p>Full-Stack Developer</p>
                <List
                  data={[
                    "Created, maintained, and redesigned front-end and back-end code for 40+ pages",
                    "Developed corresponding APIs using Node.js, Fastify, GraphQL, and MongoDB",
                    "Developed a map-based job search page that became the destination for 50% of daily users",
                    "Implemented Stripe integration, creating robust systems for invoices, subscriptions, and payments",
                    "Enhanced and optimized multiple MongoDB queries, resulting in a performance increase and a reduction in execution time by up to 30%",
                  ]}
                />
              </SectionItem>
              <SectionItem
                title="Soft Squared"
                subTitle="Remote"
                date="November 2023 - May 2024"
              >
                <p>Frontend developer (Contract)</p>
                <List
                  data={[
                    "Developed client’s e-commerce order management pages using Next.js, TypeScript, and Tailwind",
                    "Implemented admin functionalities for the client including stock and product management pages with React",
                  ]}
                />
              </SectionItem>
              <SectionItem
                title="Moornomo"
                subTitle="Incheon, South Korea"
                date="June 2021 - July 2021"
              >
                <p>Frontend developer (Contract)</p>
                <List
                  data={[
                    "Developed various functionalities for the client’s electronic document management system using React and Redux",
                    "Implemented a 3D model viewer system, which was done in less than 1/10th the previously budgeted time",
                  ]}
                />
              </SectionItem>
            </div>
          </Section>
          <Section title="Projects">
            <div className="text-a4-sm flex flex-col gap-[1.25em]">
              <SectionItem
                title="Tiny Desk"
                subTitle="A bookmark organizer web app"
                date="March 2021 - June 2021"
              >
                <List
                  data={[
                    "Lead developer on a small team of four members",
                    "Developed the frontend",
                    "Developed Chrome and Firefox Extension",
                  ]}
                />
              </SectionItem>
              <SectionItem
                title="Suni"
                subTitle="iOS scheduling app"
                date="Dec 2020 - Feb 2021"
              >
                <List
                  data={[
                    "200+ downloads",
                    "Used by over 10% of the students at the school",
                  ]}
                />
              </SectionItem>
            </div>
          </Section>
          <Section title="Skills">
            <List
              className="text-a4-sm grid grid-cols-2 gap-y-[0.3125em]"
              data={[
                "React",
                "JavaScript",
                "TypeScript",
                "Next.js",
                "Nest.js",
                "REST",
                "GraphQL",
                "Node.js",
                "MongoDB",
                "PostgreSQL",
              ]}
            />
          </Section>
        </div>
      </div>
    </div>
  );
};
export default Resume;
