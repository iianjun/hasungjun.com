import React from "react";
import * as S from "./styled";
import AboutIntro from "../../../images/about-intro.png";
import Fade from "react-reveal/Fade";
import { StaticImage } from "gatsby-plugin-image";
export const AboutIntroSection = () => {
    return (
        <S.Background>
            <S.Section>
                <Fade>
                    <S.Wrapper>
                        <StaticImage
                            src="../../../images/about-emoji.png"
                            placeholder="none"
                            className="emoji"
                        />
                    </S.Wrapper>
                    <S.TypographyWrapper>
                        <S.Header>Hasung Jun</S.Header>
                        <S.Bio>
                            I'm an software engineer, perfectionist,
                            harderworker and, an iOS enthusiast. Passionate
                            about iOS developing and learning human-computer
                            interaction. Experience with implementing
                            functionalities of an app to maximize user
                            experience.
                        </S.Bio>
                    </S.TypographyWrapper>
                </Fade>
            </S.Section>
        </S.Background>
    );
};
