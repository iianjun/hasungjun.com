import React from "react";
import {
    Layout,
    AboutIntroSection,
    AboutPictureSection,
    AboutEducationSection,
} from "../components/";

const AboutPage = () => {
    return (
        <Layout pageTitle="About">
            <AboutIntroSection />
            <AboutPictureSection />
            <AboutEducationSection />
        </Layout>
    );
};

export default AboutPage;
