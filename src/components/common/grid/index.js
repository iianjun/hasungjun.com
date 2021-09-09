import React from "react";
import * as S from "./styled";

export const GridContainer = ({ children, column }) => {
    return (
        <S.GridContainerWrapper column={column}>
            {children}
        </S.GridContainerWrapper>
    );
};

export const Grid = ({
    children,
    largeUrl,
    mediumUrl,
    backgroundColor,
    height,
    backgroundHeight,
}) => {
    return (
        <S.Wrapper
            largeUrl={largeUrl}
            mediumUrl={mediumUrl}
            backgroundColor={backgroundColor}
            height={height}
            backgroundHeight={backgroundHeight}
        >
            {children}
        </S.Wrapper>
    );
};
export const GridHeader = ({ children }) => {
    return <S.GridHeader>{children}</S.GridHeader>;
};

export const SubSection = ({ children }) => {
    return <S.SubSection>{children}</S.SubSection>;
};
