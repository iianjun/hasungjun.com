import React from "react";
import * as G from "../../common/global-style";
import Contact from "../../../images/contact-large.png";
import { LearnMore } from "../../common";
export const ContactSection = () => {
    return (
        <G.SectionLink to="/contact">
            <G.Section url={Contact}>
                <G.Typography paddingTop={50}>
                    <G.Title color="#000000">Contact</G.Title>
                    <G.Info $weight={40}>Here is how you contact me</G.Info>
                    <LearnMore />
                </G.Typography>
            </G.Section>
        </G.SectionLink>
    );
};
