import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #000000;
`;
export const Section = styled.section`
    margin-top: 44px;
    height: 320px;
    display: flex;
    align-items: center;
`;
export const SequenceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export const TypographyWrapper = styled.div`
    width: 100%;
`;

export const Header = styled.h1`
    justify-content: center;
    display: flex;
    color: #f5f5f7;
    font-size: 96px;
    line-height: 1.04167;
    font-weight: 600;
    letter-spacing: -0.015em;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    @media (max-width: 1068px) {
        font-size: 72px;
        line-height: 1.05556;
        font-weight: 600;
        letter-spacing: -0.012em;
    }
    @media (max-width: 734px) {
        font-size: 64px;
        line-height: 1.0625;
        font-weight: 600;
        letter-spacing: -0.009em;
    }
`;
export const SubHeader = styled.h2`
    text-align: center;
    width: 500px;
    font-size: 32px;
    -webkit-background-clip: text;
    -webkit-font-smoothing: antialiased;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    background-image: linear-gradient(
        225deg,
        #ff5ea7 36.04%,
        #010fcb 88.83%,
        #ff6530 220.3%
    );
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    @media (max-width: 1068px) {
        width: 300px;
        font-size: 24px;
        line-height: 1.16667;
        font-weight: 600;
        letter-spacing: 0.009em;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }

    @media (max-width: 734px) {
        width: 300px;
        font-size: 20px;
        line-height: 1.208;
    }
`;
