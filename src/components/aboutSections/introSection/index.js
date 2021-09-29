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
                            src="../../../images/about/about-emoji.png"
                            placeholder="none"
                            className="emoji"
                            alt="memoji"
                        />
                    </S.Wrapper>
                    <S.TypographyWrapper>
                        <S.Header>Hasung Jun</S.Header>
                        <S.Bio>
                            I'm a software engineer, perfectionist, harder
                            worker, and iOS enthusiast. Passionate about iOS
                            developing and learning human-computer interaction.
                            Experience with implementing functionalities of an
                            app to maximize user experience.
                        </S.Bio>

                        <S.SkillsWrapper>
                            <S.SkillsHeader>Skills</S.SkillsHeader>
                            <S.Skills>
                                <S.SkillGrid>
                                    <StaticImage
                                        src="../../../images/about/gatsby_logo.png"
                                        width={60}
                                        height={60}
                                        alt="gatsby-logo"
                                        placeholder="none"
                                    />
                                    <S.SkillName>Gatsby</S.SkillName>
                                </S.SkillGrid>
                                <S.SkillGrid>
                                    <StaticImage
                                        src="../../../images/about/react_logo.png"
                                        width={60}
                                        height={60}
                                        alt="react-logo"
                                        placeholder="none"
                                    />
                                    <S.SkillName>React</S.SkillName>
                                </S.SkillGrid>
                                <S.SkillGrid>
                                    <StaticImage
                                        src="../../../images/about/swift_logo.png"
                                        width={60}
                                        height={60}
                                        alt="swift-logo"
                                        placeholder="none"
                                    />
                                    <S.SkillName>Swift</S.SkillName>
                                </S.SkillGrid>
                                <S.SkillGrid>
                                    <StaticImage
                                        src="../../../images/about/swiftui_logo.png"
                                        width={60}
                                        height={60}
                                        alt="swiftui-logo"
                                        placeholder="none"
                                    />
                                    <S.SkillName>SwiftUI</S.SkillName>
                                </S.SkillGrid>
                            </S.Skills>
                        </S.SkillsWrapper>
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
