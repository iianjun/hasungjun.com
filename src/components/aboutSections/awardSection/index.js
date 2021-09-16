import React from "react";
import * as S from "./styled";
import { Grid, GridContainer } from "../../common";
import { Header } from "../../common/global-style";
export const AboutAwardSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <Header color="#049cb7">Award</Header>
            </S.TypographyWrapper>
            <GridContainer column="100%" noGap>
                <Grid borderBottom="2px solid #f5f5f7" borderRadius={0}></Grid>
            </GridContainer>
            <GridContainer column="50% 50%" noGap>
                <Grid borderRight="2px solid #f5f5f7" borderRadius={0}>
                    d
                </Grid>
                <Grid>dd</Grid>
                <Grid borderRight="2px solid #f5f5f7" borderRadius={0}>
                    d
                </Grid>
                <Grid>dd</Grid>
            </GridContainer>
        </S.Section>
    );
};
