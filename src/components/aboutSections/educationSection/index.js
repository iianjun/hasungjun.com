import { StaticImage } from "gatsby-plugin-image";
import { GridContainer, Grid } from "../../common";
import React from "react";
import Test3 from "../../../images/test3.png";
import { Header } from "../../common/global-style";

import * as S from "./styled";

export const AboutEducationSection = () => {
    return (
        <S.Background>
            <S.Section>
                <S.TypographyWrapper>
                    <Header color="#f63e54">Education</Header>
                </S.TypographyWrapper>
                <GridContainer column="50% 50%">
                    <Grid
                        backgroundColor="#ffffff"
                        height={300}
                        largeUrl={Test3}
                    >
                        <S.Major>Computer Science</S.Major>
                        <S.Degree>BACHELOR’S DEGREE</S.Degree>
                        <S.Explanation>
                            Stony Brook University, 2014 - 2022
                        </S.Explanation>
                    </Grid>

                    <Grid
                        backgroundColor="#ffffff"
                        height={300}
                        largeUrl={Test3}
                    >
                        <S.Major>Technological Systems Management</S.Major>
                        <S.Degree>BACHELOR’S DEGREE</S.Degree>
                        <S.Explanation>
                            Stony Brook University, 2014 - 2022
                        </S.Explanation>
                    </Grid>
                </GridContainer>
            </S.Section>
        </S.Background>
    );
};