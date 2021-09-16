import React from "react";
import * as S from "./styled";
import Fade from "react-reveal/Fade";
import { StaticImage } from "gatsby-plugin-image";
import { LearnMore } from "../../common";
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
                        <S.LinkWrapper>
                            <LearnMore
                                title="GitHub"
                                to="https://www.github.com/iianjun"
                                marginRight={20}
                            />
                            <LearnMore
                                title="LinkedIn"
                                to="https://www.linkedin.com/in/hasung-jun-b4b2aa21a"
                                marginRight={20}
                            />
                            <LearnMore
                                title="Email"
                                to="mailto:hasungjunn@gmail.com"
                                marginRight={20}
                            />
                        </S.LinkWrapper>
                    </S.TypographyWrapper>
                </Fade>
            </S.Section>
        </S.Background>
    );
};
