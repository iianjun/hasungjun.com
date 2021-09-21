import React from "react";
import * as G from "../../common/global-style";
import * as S from "./styled";
import SuniLarge from "../../../images/projects-large-suni.png";
import SuniMedium from "../../../images/projects-medium-suni.png";
import SuniSmall from "../../../images/projects-small-suni.png";
import TinyDeskLarge from "../../../images/projects-large-tinydesk.png";
import TinyDeskMedium from "../../../images/projects-medium-tinydesk.png";
import TinyDeskSmall from "../../../images/projects-small-tinydesk.png";
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
                            Schedule Management iOS App for Students in SUNY
                            Korea
                        </G.Info>
                        <LearnMore />
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
                        <LearnMore />
                    </G.Typography>
                </G.Section>
            </G.SectionLink>
        </S.Wrapper>
    );
};
