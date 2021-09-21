import styled from "styled-components";

export const Section = styled.section``;

export const TypographyWrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    max-width: 1200px;
    margin: auto;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 734px) {
        display: block;
    }
`;

export const Block = styled.div`
    display: block;
    padding-left: 50px;
`;
export const CompanyName = styled.h2`
    font-size: 35px;
    color: #8876fe;
    font-weight: 600;
    @media (max-width: 1068px) {
    }
    @media (max-width: 734px) {
    }
`;
export const Duration = styled.h3`
    font-size: 25px;
    color: #000000;
    font-weight: 600;
    @media (max-width: 1068px) {
    }
    @media (max-width: 734px) {
    }
`;
export const Expereience = styled.h4`
    color: #86868b;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.16667;
    font-weight: 600;
    letter-spacing: 0.009em;
    max-width: 700px;
    text-align: left;
    padding-bottom: 10px;
    @media (max-width: 1068px) {
    }
    @media (max-width: 734px) {
    }
`;

export const ImageWrapper = styled.div`
    @media (max-width: 734px) {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
`;
