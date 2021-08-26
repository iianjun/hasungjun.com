import React from "react";
import { Layout } from "../components";
import {
    AboutSection,
    ContactSection,
    ProjectSection,
} from "../components/homeSections";
const HomePage = () => {
    return (
        <Layout>
            <AboutSection />
            <ProjectSection />
            <ContactSection />
        </Layout>
    );
};

export default HomePage;
