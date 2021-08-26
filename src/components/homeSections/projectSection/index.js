import React from "react";
import * as G from "../../common/global-style";
import Suni from "../../../images/projects-large-suni.png";
import TinyDesk from "../../../images/projects-large-tinydesk.png";
import { LearnMore } from "../../common";

export const ProjectSection = () => {
    return (
        <>
            <G.SectionLink to="/projects">
                <G.Section url={Suni}>
                    <G.Typography paddingTop={50}>
                        <G.Title color="#ffffff">Suni</G.Title>
                        <G.Info $weight={40}>
                            Schedule Management iOS App for Students in SUNY
                            Korea
                        </G.Info>
                        <LearnMore />
                    </G.Typography>
                </G.Section>
            </G.SectionLink>
            <G.SectionLink to="/projects">
                <G.Section url={TinyDesk}>
                    <G.Typography paddingTop={50}>
                        <G.Title color="#000000">Tiny Desk</G.Title>
                        <G.Info $weight={40}>
                            Change the way you organize your bookmarks
                        </G.Info>
                        <LearnMore />
                    </G.Typography>
                </G.Section>
            </G.SectionLink>
        </>
    );
};
