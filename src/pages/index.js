import React from "react";
import { Layout } from "../components";
import {
    AboutSection,
    ContactSection,
    ProjectSection,
} from "../components/homeSections";
const HomePage = () => {
    return (
        <Layout pageTitle="Home">
            <AboutSection />
            <ProjectSection />
            <ContactSection />
        </Layout>
    );
};

export default HomePage;
