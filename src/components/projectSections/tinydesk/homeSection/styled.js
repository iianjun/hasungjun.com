import styled from "styled-components";

export const Section = styled.section`
    /* background: url(${(props) => props.largeUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 800px; */
    /* height: 800px; */
`;

export const TypographyWrapper = styled.div`
    /* justify-content: center; */
    display: block;
`;
export const Header = styled.h1`
    color: #f63e54;
    padding: 36px 40px 40px 40px;
    font-size: 56px;
    line-height: 1.0714285714;
    font-weight: 600;
    letter-spacing: -0.005em;
    //Todo: Test it is good fit on 27inch monitor
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    @media (max-width: 1068px) {
        font-size: 40px;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: 0em;
    }
`;
export const Image = styled.img`
    display: block;
    height: 800px;
    margin: auto;
    @media (max-width: 1068px) {
        height: 600px;
    }
    @media (max-width: 734px) {
        height: 400px;
    }
`;
