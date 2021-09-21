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
                        src="../../../images/moornmo-logo.png"
                        placeholder="none"
                        alt="moornmo-logo"
                        width={250}
                        width={250}
                    />
                </S.ImageWrapper>

                <S.Block>
                    <S.CompanyName>Freelance @ Moornmo</S.CompanyName>
                    <S.Duration>June - July 2021</S.Duration>
                    <S.Expereience>
                        - Developed functinoalities of client's electronic
                        document management system
                    </S.Expereience>

                    <S.Expereience>
                        - Implemented 3D model viewer, which has done within two
                        days that previous employee could not implment for three
                        month
                    </S.Expereience>

                    <S.Expereience>
                        - Implemented multiple sub-functionalities for 3D model
                        viewer features
                    </S.Expereience>
                </S.Block>
            </S.Wrapper>
        </S.Section>
    );
};
