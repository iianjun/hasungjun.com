import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    background-color: #ffffff;
    margin: auto;
    padding-bottom: 30px;
`;
export const TypographyWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 30px 65px 32px 65px;
`;
export const Header = styled.h2`
    color: #1d1d1f;
    font-size: 80px;
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.015em;
    max-width: 520px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    @media (max-width: 1068px) {
        font-size: 64px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 68px;
        font-weight: 600;
        letter-spacing: -0.576px;
    }
    @media (max-width: 734px) {
        font-size: 40px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 44px;
        font-weight: 600;
        letter-spacing: normal;
    }
`;

export const GridHeader = styled.p`
    color: black;
    font-size: 40px;
    max-width: inherit;
    line-height: 1.1;
    font-weight: 500;
    letter-spacing: 0em;
    @media (max-width: 734px) {
        font-size: 24px;
        line-height: 1.16667;
        letter-spacing: 0.009em;
    }
    @media (max-width: 1067px) {
        font-size: 28px;
        line-height: 1.14286;
        font-weight: 500;
        letter-spacing: 0.007em;
    }
`;

export const MoreFeatures = styled.div`
    color: #d1adff;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    position: relative;
    text-align: left;
    font-size: 43px;
    font-weight: 600;
    @media (max-width: 1067px) {
        font-size: 38px;
    }
    @media (max-width: 734px) {
        font-size: 43px;
    }
`;
