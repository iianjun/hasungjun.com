import React from "react";
import * as S from "./styled";
import { Grid, GridContainer } from "../../common";
import { Header } from "../../common/global-style";
import { StaticImage } from "gatsby-plugin-image";
import Test from "../../../images/gold-medal.png";
export const AboutAwardSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <Header color="#049cb7">Award</Header>
            </S.TypographyWrapper>
            <S.Wrapper>
                <S.GridContainer>
                    <S.Grid>
                        <S.FullGridcontainer>
                            <S.ImageWrapper>
                                <StaticImage
                                    src="../../../images/gold-medal.png"
                                    placeholder="none"
                                    width={112}
                                    height={112}
                                />
                                <S.Wrapper />
                            </S.ImageWrapper>
                            {/* <S.Break /> */}
                            <S.GridTypographyWrapper>
                                <S.GridHeader>
                                    2021 Fall Academic Excellence <br /> [full
                                    tuition]
                                </S.GridHeader>
                                <S.GridSubHeadline></S.GridSubHeadline>
                            </S.GridTypographyWrapper>
                        </S.FullGridcontainer>
                    </S.Grid>
                    <S.Grid>
                        <S.FullGridcontainer>
                            <S.ImageWrapper>
                                <StaticImage
                                    src="../../../images/silver-medal.png"
                                    placeholder="none"
                                    width={112}
                                    height={112}
                                />
                                <S.Wrapper />
                            </S.ImageWrapper>

                            <S.GridTypographyWrapper>
                                <S.GridHeader>
                                    2020 Academic Excellence <br /> [half
                                    tuition]
                                </S.GridHeader>
                                <S.GridSubHeadline></S.GridSubHeadline>
                            </S.GridTypographyWrapper>
                        </S.FullGridcontainer>
                    </S.Grid>
                    <S.Grid>
                        <S.FullGridcontainer>
                            <S.ImageWrapper>
                                <StaticImage
                                    src="../../../images/gold-medal.png"
                                    placeholder="none"
                                    width={112}
                                    height={112}
                                />
                                <S.Wrapper />
                            </S.ImageWrapper>

                            <S.GridTypographyWrapper>
                                <S.GridHeader>
                                    2019 Academic Excellence <br /> [full
                                    tuition]
                                </S.GridHeader>
                                <S.GridSubHeadline></S.GridSubHeadline>
                            </S.GridTypographyWrapper>
                        </S.FullGridcontainer>
                    </S.Grid>
                </S.GridContainer>
            </S.Wrapper>
        </S.Section>
    );
};
