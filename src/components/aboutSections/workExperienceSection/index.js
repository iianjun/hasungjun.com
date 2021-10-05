import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import * as S from "./styled";
import { Header } from "../../common/global-style";
export const AboutWorkExperienceSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <Header color="#8876fe">Work Experience</Header>
            </S.TypographyWrapper>
            <S.Wrapper>
                <S.ImageWrapper>
                    <StaticImage
                        src="../../../images/about/moornmo-logo.png"
                        placeholder="none"
                        alt="moornmo-logo"
                        width={250}
                    />
                </S.ImageWrapper>

                <S.Block>
                    <S.CompanyName>Freelance @ Moornmo</S.CompanyName>
                    <S.Duration>June - July 2021</S.Duration>
                    <S.Expereience>
                        - Developed various functionalities for the client’s
                        electronic document management system
                    </S.Expereience>

                    <S.Expereience>
                        - Implemented a 3D model viewer system, which was done
                        in less than 1/10th the previously budgeted time
                    </S.Expereience>
                </S.Block>
            </S.Wrapper>
        </S.Section>
    );
};
