import styled from "styled-components";

export const GridContainerWrapper = styled.div`
    max-width: 1390px;
    @media (min-width: 1280px) {
        width: 1280px;
    }
    display: grid;
    grid-row-gap: ${(props) => (props.noGap ? `0px` : `25px`)};
    grid-template-columns: ${(props) => props.column};
    @media (max-width: 734px) {
        grid-template-columns: 450px;
    }
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`;

export const Wrapper = styled.div`
    background: url(${(props) => props.largeUrl});
    background-position: ${(props) =>
        props.backgroundPosition ? `${props.backgroundPosition}` : "center"};
    background-size: ${(props) =>
        props.backgroundHeight
            ? `auto ${props.backgroundHeight}px`
            : `auto ${props.height}px`};
    background-repeat: no-repeat;
    background-color: ${(props) => props.backgroundColor};

    padding: ${(props) =>
        props.full
            ? "0px"
            : props.padding
            ? `${props.padding}`
            : "45px 40px 7px 40px"};
    border-radius: ${(props) =>
        props.borderRadius ? `${props.borderRadius}px` : `30px`};
    height: ${(props) => `${props.height}px`};
    margin-left: 12px;
    margin-right: 12px;
    border-top: ${(props) => `${props.borderTop}`};
    border-bottom: ${(props) => `${props.borderBottom}`};
    border-right: ${(props) => `${props.borderRight}`};
    @media (max-width: 1068px) {
        background: url(${(props) => props.mediumUrl});
        background-position: ${(props) =>
            props.backgroundPosition
                ? `${props.backgroundPosition}`
                : "center"};
        background-size: ${(props) =>
            props.backgroundHeight
                ? `auto ${props.backgroundHeight}px`
                : `auto ${props.height}px`};
        background-repeat: no-repeat;
        background-color: ${(props) => props.backgroundColor};
    }
    @media (max-width: 734px) {
        background: url(${(props) => props.smallUrl});
        background-position: ${(props) =>
            props.backgroundPosition
                ? `${props.backgroundPosition}`
                : "center"};
        background-size: ${(props) =>
            props.backgroundHeight
                ? `auto ${props.backgroundHeight}px`
                : `auto ${props.height}px`};
        background-repeat: no-repeat;
        background-color: ${(props) => props.backgroundColor};
    }
`;
export const GridHeader = styled.h4`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: 0.011em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    color: #f63e54;
`;

export const SubSection = styled.p`
    margin-top: 0.3em;
    font-size: 19px;
    font-weight: 600;
    max-width: 655px;
    line-height: 1.4211026316;
    font-weight: 0.012em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;
