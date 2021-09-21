import React from "react";
import * as G from "../../common/global-style";
import ContactLarge from "../../../images/contact-large.png";
import ContactMedium from "../../../images/contact-medium.png";
import ContactSmall from "../../../images/contact-small.png";
import { LearnMore } from "../../common";
export const ContactSection = () => {
    return (
        <G.SectionLink to="/contact">
            <G.Section
                largeUrl={ContactLarge}
                mediumUrl={ContactMedium}
                smallUrl={ContactSmall}
            >
                <G.Typography paddingTop={50}>
                    <G.Title color="#ffffff">Contact</G.Title>
                    <G.Info $weight={40}>Here is how you contact me</G.Info>
                    <LearnMore />
                </G.Typography>
            </G.Section>
        </G.SectionLink>
    );
};
