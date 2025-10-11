import React, { ReactNode } from "react";

import Link from "next/link";
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

const List = ({
  data,
  className,
}: {
  data: ReactNode[];
  className?: string;
}) => {
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
          <strong>{title}</strong> | <span>{subTitle}</span>
        </h3>
        <i>{date}</i>
      </div>
      {children}
    </div>
  );
};
const Resume: React.FC = () => {
  return (
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
              href="https://www.hasungjun.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hasungjun.com
            </Link>{" "}
            |{" "}
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
              <strong>Stony Brook University</strong> |{" "}
              <span>Stony Brook, NY</span>
            </h3>
            <i>May 2022</i>
          </div>
          <div className="flex justify-between">
            <p>Bachelor of Science in Computer Science</p>
            <p>GPA: 3.65 / 4.0</p>
          </div>
          <List data={["Dual major in Technological Systems Management"]} />
        </div>
      </Section>
      <Section title="Experience">
        <div className="text-a4-sm flex flex-col gap-[1.25em]">
          <SectionItem
            title="Aicy"
            subTitle="Seoul, South Korea"
            date="June 2025 - Present"
          >
            <p>Full-Stack Developer</p>
            <List
              data={[
                "Developed AI-powered chat streaming service using Gemini and OpenAI APIs for real-time financial statement analysis across PDF, Excel, and image formats, delivering automated insights and context-aware responses",
                "Architected migration from monolithic Express.js server to 2 NestJS microservices with TypeScript and Docker containerization, improving developer experience, code maintainability, and future scalability",
              ]}
            />
          </SectionItem>
          <SectionItem
            title="WorkOnward"
            subTitle="Remote"
            date="May 2022 - March 2025"
          >
            <p>Full-Stack Developer</p>
            <List
              data={[
                <React.Fragment key={1}>
                  Developed core features for hyper-local job board platform,
                  contributing <strong>majority of codebase</strong> and serving
                  as key technical liaison with design team
                </React.Fragment>,
                <React.Fragment key={2}>
                  Built full-stack features across 40+ pages using Next.js,
                  Fastify, GraphQL, and MongoDB
                </React.Fragment>,
                <React.Fragment key={3}>
                  Developed map-based job search feature that became the
                  destination for <strong>50% of daily users</strong>
                </React.Fragment>,
                <React.Fragment key={4}>
                  Optimized MongoDB pagination queries using aggregation facets,
                  reducing execution time by <strong>30%</strong> and
                  significantly improving map-based search performance during
                  boundary updates
                </React.Fragment>,
                <React.Fragment key={5}>
                  Implemented Stripe integration, creating robust systems for
                  invoices, subscriptions, and payments
                </React.Fragment>,
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
                "Developed key features for greenfield e-commerce platform across 2 domains (customer-facing and seller admin) using Next.js, TypeScript, and Tailwind",
                "Developed order management system, product CRUD operations, and Excel-to-JSON product bulk upload functionality",
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
                <React.Fragment key={1}>
                  Developed features for electronic document management system
                  using React and Redux
                </React.Fragment>,
                <React.Fragment key={2}>
                  Implemented 3D model viewer using iTwin.js and React,
                  delivering in <strong>1/10th the budgeted time</strong>
                </React.Fragment>,
              ]}
            />
          </SectionItem>
        </div>
      </Section>
      {/* <Section title="Projects">
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
      </Section> */}
      <Section title="Skills">
        <List
          className="text-a4-sm"
          data={[
            <p key="frontend">
              <strong>Frontend</strong>: JavaScript, TypeScript, React, Next.js,
              Redux, Tailwind CSS
            </p>,
            <p key="backend">
              <strong>Backend & Database</strong>: Node.js, Nest.js, Express.js,
              Fastify, REST, GraphQL, MongoDB, PostgreSQL, Docker, Git
            </p>,
          ]}
        />
      </Section>
    </div>
  );
};
export default Resume;
