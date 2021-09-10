import React from "react";
import {
    Layout,
    TinydeskIntroSection,
    TinyDeskHomeSection,
    TinyDeskWidgetSection,
    TinyDeskBGSection,
} from "../components";

const TinydeskPage = () => {
    return (
        <Layout pageTitle="Tiny Desk">
            <TinydeskIntroSection />
            <TinyDeskHomeSection />
            <TinyDeskWidgetSection />
            <TinyDeskBGSection />
        </Layout>
    );
};

export default TinydeskPage;
