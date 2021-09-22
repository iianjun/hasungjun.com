import React from "react";
import * as S from "./styled";
import CalendarLarge from "../../../../images/projects/suni/academic-calendar-large.png";
import CalendarMedium from "../../../../images/projects/suni/academic-calendar-medium.png";

import { GridContainer, Grid } from "../../../common/";

export const MoreSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <S.Header>Even more features.</S.Header>
            </S.TypographyWrapper>
            <GridContainer column="50% 50%">
                <Grid
                    largeUrl={CalendarLarge}
                    mediumUrl={CalendarMedium}
                    smallUrl={CalendarMedium}
                    backgroundColor="#f5f5f7"
                    height={700}
                >
                    <S.GridHeader>
                        Easy visualization on Academic Calendar
                    </S.GridHeader>
                </Grid>

                <Grid backgroundColor="#f5f5f7" height={700}>
                    <S.MoreFeatures>
                        Take a Screenshot and share it with friends. <br />
                        Phonebooth. <br />
                        Link to course detail. <br />
                        Dynamic course list update. <br />
                    </S.MoreFeatures>
                </Grid>
            </GridContainer>
        </S.Section>
    );
};
