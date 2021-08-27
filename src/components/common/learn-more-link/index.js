import React from "react";
import * as G from "../global-style";
import Chevronright from "../../../images/chevronright.svg";
export const LearnMore = () => {
    return (
        <G.LinkWrapper>
            <G.LearnMoreLink>Learn more</G.LearnMoreLink>
            <G.Chevronright src={Chevronright} alt="chevronright" />
        </G.LinkWrapper>
    );
};
