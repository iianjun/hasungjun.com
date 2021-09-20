import React from "react";
import * as S from "./styled";
import { StaticImage } from "gatsby-plugin-image";
export const TinyDeskHomeSection = () => {
    return (
        <S.Section>
            <S.Header>Homepage</S.Header>

            <StaticImage
                src="../../../../images/tinydesk-homepage.png"
                placeholder="none"
                className="tinydesk-homepage"
            />
        </S.Section>
    );
};
