import styled from "styled-components";

export const Section = styled.section`
    display: flex;
    justify-content: center;
    background: url(${(props) => props.largeUrl});
    background-repeat: no-repeat;
    background-size: auto 700px;
    background-position: center;
    height: 700px;
    /* @media (max-width: 768px) {
        background: url(${(props) => props.mediumUrl});
        background-repeat: no-repeat;
        background-size: auto 700px;
        background-position: center;
    } */
`;

export const TypographyWrapper = styled.div`
    width: 100%;
    margin-left: 30px;
    margin-top: 50px;
`;

export const Header = styled.h2`
    color: #f5f5f7;
    font-size: 80px;
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.015em;
    width: 50%;
`;
export const SubHeadline = styled.p`
    color: #a1a1a6;
    font-size: 21px;
    line-height: 1.19048;
    font-weight: 600;
    letter-spacing: 0.011em;
    margin-top: 5px;
    b {
        color: #f5f5f7;
    }
`;
