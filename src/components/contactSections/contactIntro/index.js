import React from "react";

import * as S from "./styled";
import * as G from "../../common/global-style";
import { Link } from "react-scroll";
import { AppleButton } from "../../common";
import { StaticImage } from "gatsby-plugin-image";

export const ContactIntro = (props) => {
    const onClickBuy = () => {
        props.setClickedBuy(true);
    };

    return (
        <S.IntroSection>
            <G.Typography>
                <G.Heading>New</G.Heading>
                <G.Title>Contact Me</G.Title>
                <G.SubTitle $weight={450}>Say hello.</G.SubTitle>
            </G.Typography>
            <G.ButtonWrapper>
                <Link
                    activeClass="active"
                    className="contactForm"
                    to="contactForm"
                    spy={true}
                    smooth={true}
                    duration={1000}
                >
                    <AppleButton onClick={onClickBuy}>Buy</AppleButton>
                </Link>
            </G.ButtonWrapper>
            <S.ImageWrapper>
                <StaticImage
                    src="../../../images/contact-bg.png"
                    alt="contact-bg.png"
                    placeholder="blurred"
                    layout="fixed"
                    height={800}
                    className="contact-bg"
                />
            </S.ImageWrapper>
            {/* <StaticImage src="../../../images/contact-bg.png" alt="contactBg" /> */}
            {/* <StaticImage
                className={classes.contactBg}
                src="../../../images/contact-bg.png"
                alt="contactBg"
            /> */}

            <S.ContactForm id="contact"></S.ContactForm>
        </S.IntroSection>
    );
};
