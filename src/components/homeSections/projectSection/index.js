import React from "react";
import * as G from "../../common/global-style";
import * as S from "./styled";
import SuniLarge from "../../../images/projects-large-suni.png";
import SuniMedium from "../../../images/projects-medium-suni.png";
import TinyDeskLarge from "../../../images/projects-large-tinydesk.png";
import TinyDeskMedium from "../../../images/projects-medium-tinydesk.png";
import { LearnMore } from "../../common";

export const ProjectSection = ({ paddingTop }) => {
    return (
        <S.Wrapper paddingTop={paddingTop}>
            <G.SectionLink to="/suni">
                <S.Section largeUrl={SuniLarge} mediumUrl={SuniMedium}>
                    <G.Typography paddingTop={50}>
                        <G.Title color="#ffffff">Suni</G.Title>
                        <G.Info $weight={40}>
                            Schedule Management iOS App for Students in SUNY
                            Korea
                        </G.Info>
                        <LearnMore />
                    </G.Typography>
                </S.Section>
            </G.SectionLink>
            <G.SectionLink to="/tinydesk">
                <S.Section largeUrl={TinyDeskLarge} mediumUrl={TinyDeskMedium}>
                    <G.Typography paddingTop={50}>
                        <G.Title color="#000000">Tiny Desk</G.Title>
                        <G.Info $weight={40}>
                            Change the way you organize your bookmarks
                        </G.Info>
                        <LearnMore />
                    </G.Typography>
                </S.Section>
            </G.SectionLink>
        </S.Wrapper>
    );
};
