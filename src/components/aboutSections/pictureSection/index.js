import React from "react";
import { GridContainer, Grid } from "../../common";
import * as S from "./styled";
import SelfPicture1 from "../../../images/about/self-picture1.png";
import SelfPicture2 from "../../../images/about/self-picture2.png";
export const AboutPictureSection = () => {
    return (
        <S.Section>
            <GridContainer column="50% 50%">
                <Grid
                    height={720}
                    largeUrl={SelfPicture1}
                    mediumUrl={SelfPicture1}
                    smallUrl={SelfPicture1}
                    full
                />
                <Grid
                    height={720}
                    largeUrl={SelfPicture2}
                    mediumUrl={SelfPicture2}
                    smallUrl={SelfPicture2}
                    full
                />
            </GridContainer>
        </S.Section>
    );
};
