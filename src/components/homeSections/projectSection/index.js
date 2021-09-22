import React from "react";
import * as G from "../../common/global-style";
import * as S from "./styled";
import SuniLarge from "../../../images/home/projects-large-suni.png";
import SuniMedium from "../../../images/home/projects-medium-suni.png";
import SuniSmall from "../../../images/home/projects-small-suni.png";
import TinyDeskLarge from "../../../images/home/projects-large-tinydesk.png";
import TinyDeskMedium from "../../../images/home/projects-medium-tinydesk.png";
import TinyDeskSmall from "../../../images/home/projects-small-tinydesk.png";
import { LearnMore } from "../../common";

export const ProjectSection = ({ paddingTop }) => {
    return (
        <S.Wrapper paddingTop={paddingTop}>
            <G.SectionLink to="/suni">
                <G.Section
                    largeUrl={SuniLarge}
                    mediumUrl={SuniMedium}
                    smallUrl={SuniSmall}
                >
                    <G.Typography paddingTop={50}>
                        <G.Title color="#ffffff">Suni</G.Title>
                        <G.Info $weight={40}>
                            Schedule management iOS app for students in SUNY
                            Korea
                        </G.Info>
                        <LearnMore to="/suni" />
                    </G.Typography>
                </G.Section>
            </G.SectionLink>
            <G.SectionLink to="/tinydesk">
                <G.Section
                    largeUrl={TinyDeskLarge}
                    mediumUrl={TinyDeskMedium}
                    smallUrl={TinyDeskSmall}
                >
                    <G.Typography paddingTop={50}>
                        <G.Title color="#000000">Tiny Desk</G.Title>
                        <G.Info $weight={40}>
                            Change the way you organize your bookmarks
                        </G.Info>
                        <LearnMore to="/tinydesk" />
                    </G.Typography>
                </G.Section>
            </G.SectionLink>
        </S.Wrapper>
    );
};
