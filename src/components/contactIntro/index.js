import React from "react";
import ContactBG from "../../images/contact-bg.png";
import * as S from "./styled";
import * as G from "../common/global-style";
import { Link } from "react-scroll";
import { AppleButton } from "../common";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/styles";
import { graphql } from "gatsby";
const useStyles = makeStyles({
    contactBg: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "400px",
        marginTop: "1em",
    },
});
export const ContactIntro = (props) => {
    const classes = useStyles();
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
            <StaticImage
                className={classes.contactBg}
                src="../../images/contact-bg.png"
                alt="contactBg"
            />

            <S.ContactForm id="contact"></S.ContactForm>
        </S.IntroSection>
    );
};
