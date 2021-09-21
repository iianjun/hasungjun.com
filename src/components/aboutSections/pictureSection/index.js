import React from "react";
import { GridContainer, Grid } from "../../common";
import * as S from "./styled";
import SelfPicture1 from "../../../images/self-picture1.png";
import SelfPicture2 from "../../../images/self-picture2.png";
export const AboutPictureSection = () => {
    return (
        <S.Section>
            <GridContainer column="50% 50%">
                <Grid height={720} largeUrl={SelfPicture1} full />
                <Grid height={720} largeUrl={SelfPicture2} full />
            </GridContainer>
        </S.Section>
    );
};
