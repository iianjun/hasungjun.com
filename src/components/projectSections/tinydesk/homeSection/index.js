import React, { useEffect, useState } from "react";
import * as S from "./styled";
import TinydeskHomepage from "../../../../images/tinydesk-homepage.png";
import { StaticImage } from "gatsby-plugin-image";
import { css } from "styled-components";
export const TinyDeskHomeSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <S.Header>Homepage</S.Header>
            </S.TypographyWrapper>

            <StaticImage
                src="../../../../images/tinydesk-homepage.png"
                placeholder="none"
                className="tinydesk-homepage"
            />
        </S.Section>
    );
};
