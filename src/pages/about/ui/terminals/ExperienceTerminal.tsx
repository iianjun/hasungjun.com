import { FloatingTerminal, type FloatingTerminalProps } from "@/shared/ui";

import { ExperienceSection } from "@/features/experience";
import React from "react";

const ExperienceTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-6">
        <ExperienceSection
          period="June 2025 — Present"
          jobTitle="Full-Stack developer"
          company="Aicy"
          description="Built an AI-powered chat streaming service for real-time financial statement analysis using Gemini and OpenAI APIs, supporting PDF, Excel, and image formats. Architected migration from monolithic Express.js server to scalable NestJS microservices with TypeScript and Docker containerization, improving code maintainability, developer experience, and deployment efficiency."
        />
        <ExperienceSection
          period="May 2022 — March 2025"
          jobTitle="Full-Stack developer"
          company="WorkOnward"
          description="Build and maintain critical frontend UIs using React and Next.js. Worked closely with design team to implement and deliver better UX. Developed and maintained RESTful APIs and GraphQL using Node.js and Fastify to ensure seamless communication between the frontend and backend systems while integrating MongoDB for efficient data storage and optimizing queries to enhance application performance."
        />
        <ExperienceSection
          period="November 2023 - May 2024"
          jobTitle="Frontend developer (Contract)"
          company="Soft Squared"
          description="Build and styled interactive e-commerce web apps, inclduing the order management user interface and product management system in the admin page using Next.js, Typescript, and Tailwind CSS."
        />
      </div>
    </FloatingTerminal>
  );
};

export default ExperienceTerminal;
