import React, { useEffect, useState } from "react";
import * as S from "./styled";
import TinydeskHomepage from "../../../../images/tinydesk-homepage.png";

export const TinyDeskHomeSection = () => {
    return (
        <S.Section>
            <S.TypographyWrapper>
                <S.Header>Homepage</S.Header>
            </S.TypographyWrapper>
            <S.Image src={TinydeskHomepage}></S.Image>
        </S.Section>
    );
};
