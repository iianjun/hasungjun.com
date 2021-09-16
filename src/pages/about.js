import React from "react";
import {
    Layout,
    AboutIntroSection,
    AboutPictureSection,
    AboutEducationSection,
    AboutWorkExperienceSection,
    AboutAwardSection,
} from "../components/";

const AboutPage = () => {
    return (
        <Layout pageTitle="About">
            <AboutIntroSection />
            <AboutPictureSection />
            <AboutEducationSection />
            <AboutWorkExperienceSection />
            <AboutAwardSection />
        </Layout>
    );
};

export default AboutPage;
