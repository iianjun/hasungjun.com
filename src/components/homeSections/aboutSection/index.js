import React from "react";
import * as G from "../../common/global-style";
import LogosLarge from "../../../images/logos-large.png";
import LogosMedium from "../../../images/logos-medium.png";
import { LearnMore } from "../../common";
export const AboutSection = () => {
    return (
        <G.SectionLink to="/about">
            <G.Section
                largeUrl={LogosLarge}
                mediumUrl={LogosMedium}
                paddingTop={90}
            >
                <G.Typography>
                    <G.Title>Hasung Jun</G.Title>
                    <G.Info>
                        Hello, I’m Hasung Jun, but you can call me Ian. <br />
                        I’m a software engineer and iOS enthusiast
                    </G.Info>
                    <LearnMore />
                </G.Typography>
            </G.Section>
        </G.SectionLink>
    );
};
