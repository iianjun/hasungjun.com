import React from "react";
import * as S from "./styled";

export const GridContainer = ({ children, column, noGap }) => {
    return (
        <S.GridContainerWrapper column={column} noGap={noGap}>
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
    full,
    padding,
    borderTop,
    borderBottom,
    borderRight,
    borderRadius,
}) => {
    return (
        <S.Wrapper
            largeUrl={largeUrl}
            mediumUrl={mediumUrl}
            backgroundColor={backgroundColor}
            height={height}
            backgroundHeight={backgroundHeight}
            full={full}
            padding={padding}
            borderTop={borderTop}
            borderBottom={borderBottom}
            borderRight={borderRight}
            borderRadius={borderRadius}
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
