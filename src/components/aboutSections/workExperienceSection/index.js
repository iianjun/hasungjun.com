import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import * as S from "./styled";
export const AboutWorkExperienceSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <S.Header>Work Experience</S.Header>
            </S.TypographyWrapper>
            <S.Wrapper>
                <StaticImage
                    src="../../../images/moornmo-logo.png"
                    placeholder="none"
                    height={250}
                />
                <S.Block>
                    <S.CompanyName>Moornmo</S.CompanyName>
                    <S.Duration>June 2021 - July 2021</S.Duration>
                </S.Block>
            </S.Wrapper>
        </S.Section>
    );
};
