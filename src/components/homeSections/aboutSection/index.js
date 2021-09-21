import React from "react";
import * as G from "../../common/global-style";
import LogosLarge from "../../../images/home/logos-large.png";
import LogosMedium from "../../../images/home/logos-medium.png";
import LogosSmall from "../../../images/home/logos-small.png";
import { LearnMore } from "../../common";
export const AboutSection = () => {
    return (
        <G.SectionLink to="/about">
            <G.Section
                largeUrl={LogosLarge}
                mediumUrl={LogosMedium}
                smallUrl={LogosSmall}
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
