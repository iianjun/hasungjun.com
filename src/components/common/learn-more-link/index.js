import React from "react";
import * as G from "../global-style";
import Chevronright from "../../../images/chevronright.svg";
export const LearnMore = ({ title, to, marginTop, marginRight }) => {
    console.log(title);
    return (
        <G.LinkWrapper
            marginTop={marginTop ? marginTop : 0}
            marginRight={marginRight ? marginRight : 0}
        >
            <G.LearnMoreLink href={to}>
                {title ? title : "Learn more"}
            </G.LearnMoreLink>
            <G.Chevronright src={Chevronright} />
        </G.LinkWrapper>
    );
};
