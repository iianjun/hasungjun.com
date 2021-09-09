import React from "react";

import {
    Layout,
    MoreSection,
    SuniIntroSection,
    ScheduleSection,
    AddCourseSection,
} from "../components";

const SuniPage = () => {
    return (
        <Layout pageTitle="Suni">
            <SuniIntroSection />
            <ScheduleSection />
            <AddCourseSection />

            <MoreSection />
        </Layout>
    );
};

export default SuniPage;
