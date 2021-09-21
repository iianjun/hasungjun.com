import styled from "styled-components";
export const Background = styled.div`
    background-color: #f5f5f7;
    padding-bottom: 30px;
`;

export const Section = styled.section``;
export const TypographyWrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    max-width: 1200px;
    margin: auto;
`;

export const Major = styled.h2`
    font-size: 30px;
    color: #f63e54;
    font-weight: 600;
    max-width: 900px;
    line-height: 1.1;
    letter-spacing: 0em;
    margin-bottom: 20px;
    text-align: left;
    @media (max-width: 1068px) {
        font-size: 24px;
    }
    @media (max-width: 734px) {
        font-size: 30px;
    }
`;

export const Block = styled.div`
    display: block;
    margin-left: 10px;
`;
export const Degree = styled.h3`
    color: #000000;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: 0em;
    margin-bottom: 20px;
    @media (max-width: 1068px) {
        font-size: 20px;
    }
    @media (max-width: 734px) {
        font-size: 28px;
    }
`;
export const Explanation = styled.h4`
    font-size: 21px;
    color: #82828b;
    font-weight: 600;
    @media (max-width: 1068px) {
        font-size: 18px;
    }
    @media (max-width: 734px) {
        font-size: 21px;
    }
`;
