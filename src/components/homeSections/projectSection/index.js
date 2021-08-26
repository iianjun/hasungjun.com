import React from "react";
import * as G from "../../common/global-style";
import SuniProjects from "../../../images/projects-large-suni.png";
import { LearnMore } from "../../common";

export const ProjectSection = () => {
    return (
        <G.SectionLink to="/projects">
            <G.Section url={SuniProjects}>
                <G.Typography paddingTop={50}>
                    <G.Title color="#ffffff">Suni</G.Title>
                    <G.Info $weight={40}>
                        Schedule Management iOS App for Students in SUNY Korea
                    </G.Info>
                    <LearnMore />
                </G.Typography>
            </G.Section>
        </G.SectionLink>
    );
};
