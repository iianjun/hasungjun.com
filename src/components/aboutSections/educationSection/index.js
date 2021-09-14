import { StaticImage } from "gatsby-plugin-image";
import { GridContainer, Grid } from "../../common";
import React from "react";
import StonyBrook from "../../../images/stony-brook-logo.png";
import StonyBrook2 from "../../../images/stony-brook-logo2.png";
import * as S from "./styled";

export const AboutEducationSection = () => {
    return (
        <S.Background>
            <S.Section>
                <S.TypographyWrapper>
                    <S.Header>Education</S.Header>
                </S.TypographyWrapper>

                {/* <StaticImage
                        src="../../../images/stony-brook-logo.png"
                        placeholder="none"
                        height={300}
                    /> */}
                {/* <S.Block> */}
                <GridContainer column="100%">
                    <Grid backgroundColor="#ffffff" padding="20px 20px">
                        <StaticImage
                            src="../../../images/stony-brook-logo2.png"
                            placeholder="none"
                            alt="stony-brook-logo"
                            className="stony-brook-logo"
                        />
                    </Grid>
                    <GridContainer column="50% 50%">
                        <Grid backgroundColor="#ffffff" height={300}>
                            <S.Major>Computer Science</S.Major>
                            <S.Explanation>Helloi</S.Explanation>
                        </Grid>

                        <Grid backgroundColor="#ffffff" height={300}>
                            <S.Major>Technological Systems Management</S.Major>
                            <S.Explanation>Helloi</S.Explanation>
                        </Grid>
                    </GridContainer>
                </GridContainer>
            </S.Section>
        </S.Background>
    );
};
