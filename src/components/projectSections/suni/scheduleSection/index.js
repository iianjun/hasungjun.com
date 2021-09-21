import React, { useRef } from "react";
import * as S from "./styled";
import LargeUrl from "../../../../images/suni-schedule-large.png";
import MediumUrl from "../../../../images/suni-schedule-medium.png";
import SmallUrl from "../../../../images/suni-schedule-small.png";
export const ScheduleSection = () => {
    return (
        <>
            <S.Section
                largeUrl={LargeUrl}
                mediumUrl={MediumUrl}
                smallUrl={SmallUrl}
            >
                <S.TypographyWrapper>
                    <S.Header>
                        Weekly canlendar. <br />
                        On one hand.
                    </S.Header>
                </S.TypographyWrapper>
            </S.Section>
        </>
    );
};
