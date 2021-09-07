import styled from "styled-components";

export const Section = styled.section`
    background: url(${(props) => props.largeUrl});
    background-repeat: no-repeat;
    background-size: auto 800px;
    background-position: center;
    height: 800px;

    @media (max-width: 1068px) {
        background: url(${(props) => props.mediumUrl});
        background-repeat: no-repeat;
        background-size: auto 800px;
        background-position: center;
    }
`;

export const TypographyWrapper = styled.div`
    width: 100%;
`;

export const Header = styled.h2`
    color: #f5f5f7;
    font-size: 80px;
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.015em;
    max-width: 650px;
    margin-left: 20%;
    padding-top: 70px;
    text-align: left;
    @media (max-width: 1596px) {
        font-size: 64px;
        padding-top: 0;
    }
    @media (max-width: 734px) {
        font-size: 50px;
    }
`;
