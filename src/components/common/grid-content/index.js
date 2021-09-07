import React from "react";
import * as S from "./styled";
export const GridContent = ({ children, largeUrl, mediumUrl }) => {
    return (
        <S.Wrapper largeUrl={largeUrl} mediumUrl={mediumUrl}>
            {children}
        </S.Wrapper>
    );
};
