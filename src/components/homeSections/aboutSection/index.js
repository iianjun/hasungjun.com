import React from "react";
import * as S from "./styled";
import * as G from "../../common/global-style";
import Chevronright from "../../../images/chevronright.svg";

export const AboutSection = () => {
    return (
        <G.SectionLink to="/about">
            <S.Section>
                <G.Typography>
                    <G.Title>Hasung Jun</G.Title>
                    <G.SubTitle $weight={400}>Software Engineer</G.SubTitle>
                    <G.Info>
                        Hello, I am Hasung Jun, also go by Ian <br />A Software
                        Engineer, enthusiastic about iOS
                    </G.Info>
                    <G.LinkWrapper>
                        <G.LearnMoreLink>Learn more</G.LearnMoreLink>
                        <G.Chevronright src={Chevronright} />
                    </G.LinkWrapper>
                </G.Typography>
            </S.Section>
        </G.SectionLink>
    );
};
