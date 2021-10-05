import React from "react";

import * as S from "./styled";
import * as G from "../../common/global-style";
import { AppleButton } from "../../common";
import { StaticImage } from "gatsby-plugin-image";

export const ContactIntro = () => {
    return (
        <S.IntroSection>
            <G.Typography>
                <G.Heading>New</G.Heading>
                <G.Title>Contact Me</G.Title>
                <G.SubTitle $weight={450}>Say hello.</G.SubTitle>
            </G.Typography>
            <G.ButtonWrapper>
                <S.MailTo href="mailto:hasungjunn@gmail.com">
                    <AppleButton>Message</AppleButton>
                </S.MailTo>
            </G.ButtonWrapper>
            <S.ImageWrapper>
                <StaticImage
                    src="../../../images/contact/contact-bg.png"
                    alt="contact-bg"
                    placeholder="none"
                    width={350}
                    className="contact-bg"
                />
            </S.ImageWrapper>

            <S.ContactForm id="contact"></S.ContactForm>
        </S.IntroSection>
    );
};
