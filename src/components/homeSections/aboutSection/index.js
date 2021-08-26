import React from "react";
import * as G from "../../common/global-style";

import Logos from "../../../images/logos-large.png";
import { LearnMore } from "../../common";
export const AboutSection = () => {
    return (
        <G.SectionLink to="/about">
            <G.Section url={Logos} paddingTop={90}>
                <G.Typography>
                    <G.Title>Hasung Jun</G.Title>
                    <G.SubTitle $weight={400}>Software Engineer</G.SubTitle>
                    <G.Info>
                        Hello, I am Hasung Jun, also go by Ian <br />A Software
                        Engineer, enthusiastic about iOS
                    </G.Info>
                    <LearnMore />
                </G.Typography>
            </G.Section>
        </G.SectionLink>
    );
};
