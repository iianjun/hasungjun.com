import styled from "styled-components";

export const Section = styled.section`
    width: 1440px;
    background-color: #ffffff;
    margin: auto;
    /* @media (max-width: 1279px) {
        width: 1200px;
    }
    @media (max-width: 959px) {
        width: 800px;
    }
    @media (max-width: 599px) {
        width: 10%;
    }
    @media (min-width: 598px) {
        width: 80%;
    } */
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
    @media (max-width: 1068px) {
        font-size: 28px;
        line-height: 1.14286;
        font-weight: 500;
        letter-spacing: 0.007em;
    }
`;

export const GridContainer = styled.div`
    display: grid;

    grid-template-columns: 50% 50%;
    @media (max-width: 700px) {
        grid-template-columns: auto;
    }
    margin-left: 50%;
    margin-right: 50%;
    transform: translateX(-50%);
    width: 1390px;
    padding-left: 25px;
    padding-right: 25px;
`;

export const Grid = styled.div`
    background: url(${(props) => props.largeUrl});
    background-position: center;
    background-size: auto 720px;
    background-color: #f5f5f7;
    background-repeat: no-repeat;
    padding: 45px 40px 7px 40px;
    border-radius: 30px;
    min-height: 720px;
    margin-left: 12px;
    margin-right: 12px;
`;
