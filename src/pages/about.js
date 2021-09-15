import React from "react";
import {
    Layout,
    AboutIntroSection,
    AboutPictureSection,
    AboutEducationSection,
    AboutWorkExperienceSection,
} from "../components/";

const AboutPage = () => {
    return (
        <Layout pageTitle="About">
            <AboutIntroSection />
            <AboutPictureSection />
            <AboutEducationSection />
            <AboutWorkExperienceSection />
        </Layout>
    );
};

export default AboutPage;
