import React from "react";
import { GridContent } from "../../../common";
import * as S from "./styled";
import CalendarLarge from "../../../../images/academic-calendar-large.png";
import CalendarMedium from "../../../../images/academic-calendar-medium.png";
import { StaticImage } from "gatsby-plugin-image";

export const MoreSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <S.Header>Even more features.</S.Header>
            </S.TypographyWrapper>
            <S.GridContainer>
                <S.Grid largeUrl={CalendarLarge}>
                    <S.GridHeader>
                        Easy visualization on Academic Calendar
                    </S.GridHeader>
                </S.Grid>

                <S.Grid>
                    <S.MoreFeatures>
                        Take Screenshot and share with friends. <br />
                        Phone booth of staff. <br />
                        Link to course detail. <br />
                        Dynamic course list update. <br />
                    </S.MoreFeatures>
                </S.Grid>
            </S.GridContainer>
        </S.Section>
    );
};
