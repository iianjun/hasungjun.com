import React from "react";
import * as S from "./styled";
import TinyIntro from "../../../../images/tinydesk-intro.png";
import { LearnMore } from "../../../common";
import { StaticImage } from "gatsby-plugin-image";
export const TinydeskIntroSection = () => {
    return (
        <>
            <S.Section>
                <S.TypographyWrapper>
                    <S.Header>Tiny Desk</S.Header>
                    <S.Headline>Maximize efficiency.</S.Headline>
                    <LearnMore
                        title="GitHub"
                        to="https://github.com/iianjun/tinydesk"
                        marginTop="10"
                    />
                    <LearnMore
                        title="Visit"
                        to="https://www.tinydesk.me"
                        marginTop="10"
                    />
                </S.TypographyWrapper>
                <S.ImageWrapper>
                    <StaticImage
                        src="../../../../images/tinydesk-intro.png"
                        alt="tinydesk-intro"
                        placeholder="blurred"
                        style={{
                            borderRadius: "20px",
                        }}
                    />
                </S.ImageWrapper>
                <S.TypographyWrapper>
                    <S.SubHeadline>
                        Tiny Desk provides cross-browser compatibility. Change
                        the way you think of the browser bookmark system. It
                        maximizes your work efficiency and the user experience
                        of using bookmarks. It is packed with multiple
                        functionalities, including Widgets for weather,
                        calendar, notes, and todos. Additionally, it includes a
                        folder system to organize the homepage.
                    </S.SubHeadline>
                </S.TypographyWrapper>
            </S.Section>
        </>
    );
};
