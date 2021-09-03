import React, { useState } from "react";
import * as S from "./styled";
import LargeUrl from "../../../../images/suni-schedule-large.png";
import MediumUrl from "../../../../images/suni-schedule-medium.png";
import Fade from "react-reveal/Fade";

const subHeadlines = [
    "Take Screenshot and share with friends",
    "Academic Calendar",
    "Phone booth of staff",
    "Link to course detail",
    "Dynamic course list update",
    "Manually add courses",
];

export const ScheduleSection = () => {
    const [show, setShow] = useState(false);

    return (
        <S.Section largeUrl={LargeUrl} mediumUrl={MediumUrl}>
            <S.TypographyWrapper>
                <S.Header>Your weekly canlendar on your one hand</S.Header>

                <S.SubHeadline>
                    <b>With more features</b>
                </S.SubHeadline>
                <Fade bottom cascade>
                    <div>
                        {subHeadlines.map((subHeadline) => {
                            return <S.SubHeadline>{subHeadline}</S.SubHeadline>;
                        })}
                    </div>
                </Fade>
            </S.TypographyWrapper>
        </S.Section>
    );
};
