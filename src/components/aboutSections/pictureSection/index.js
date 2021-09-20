import React from "react";
import { GridContainer, Grid } from "../../common";
import * as S from "./styled";
import Test1 from "../../../images/test1.png";
import Test2 from "../../../images/test2.png";
export const AboutPictureSection = () => {
    return (
        <S.Section>
            <GridContainer column="50% 50%">
                <Grid height={720} largeUrl={Test1} full />
                <Grid height={720} largeUrl={Test2} full />
            </GridContainer>
        </S.Section>
    );
};
