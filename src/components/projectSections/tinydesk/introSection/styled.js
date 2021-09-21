import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    margin-top: 44px;
    background-color: #f5f5f7;
`;
export const TypographyWrapper = styled.div`
    padding-top: 40px;
    color: #1d1d1f;
    margin-left: auto;
    margin-right: auto;
    width: 980px;
    margin-bottom: 30px;

    @media (max-width: 1068px) {
        width: 692px;
    }
    @media (max-width: 734px) {
        width: 87.5%;
    }
`;
export const Header = styled.h1`
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    width: 100%;
    font-size: 25.5px;
    font-weight: 600;
    -webkit-background-clip: text;
    -webkit-font-smoothing: antialiased;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
        180deg,
        #6d51fb 36.04%,
        #f8c836 88.83%,
        #54b8f8 220.3%
    );
`;

export const Headline = styled.p`
    font-size: 80px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 10px;
    line-height: 1.05;
    letter-spacing: -0.015em;
    max-width: 800px;
    margin: auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    @media (max-width: 1076px) {
        font-size: 70px;
    }
    @media (max-width: 734px) {
        font-size: 56px;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 1200px;
    @media (max-width: 1200px) {
        width: 850px;
    }
    @media (max-width: 876px) {
        width: 700px;
    }
    @media (max-width: 734px) {
        width: 400px;
    }
`;

export const SubHeadline = styled.p`
    font-size: 40px;
    color: #86868b;
    font-weight: 600;
    max-width: 900px;
    line-height: 1.1;
    letter-spacing: 0em;
    text-align: left;
    margin: auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    padding-bottom: 100px;
    @media (max-width: 1068px) {
        font-size: 32px;
        max-width: 630px;
    }
    @media (max-width: 734px) {
        font-size: 24px;
        max-width: 100%;
    }
`;
