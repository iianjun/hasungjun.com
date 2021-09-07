import styled from "styled-components";
import { Link } from "gatsby";
export const Typography = styled.div`
    padding-top: ${(props) =>
        props.paddingTop ? `${props.paddingTop}px` : `0px`};
    width: 100%;
`;
export const Heading = styled.span`
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    letter-spacing: -0.022em;
    font-weight: 600;
    background: rgba(0, 0, 0, 0);
    border-color: #bf4800;
    color: #f56300;
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
`;
export const Title = styled.h2`
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
    color: ${(props) => props.color};
    font-size: 56px;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -0.005em;
    :visited {
        color: red;
    }
`;

export const SubTitle = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
    font-size: 28px;
    line-height: 1.14286;
    font-weight: ${(props) => `${props.$weight}`};
    letter-spacing: 0.007em;
    margin-top: 6px;
    margin-bottom: 15px;
`;
export const Info = styled.p`
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-top: 0.4rem;
    color: #86868b;
    text-align: center;
    font-weight: 300;
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
    letter-spacing: 0.007em;
`;
export const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const LearnMoreLink = styled.a`
    color: #0066cc;
    font-size: 19px;
    line-height: 1.21053;
    font-weight: 400;
    letter-spacing: 0.011em;
    font-family: sans-serif;
    :visited,
    :active {
        color: #0066cc;
    }
    margin-left: -4px;
    &:hover {
        text-decoration: underline;
    }
`;
export const ButtonWrapper = styled.div`
    margin-top: 13.6px;
    display: flex;
    justify-content: center;
`;

export const SectionLink = styled(Link)`
    :active,
    :visited,
    :link {
        color: black;
    }
`;
export const Chevronright = styled.img`
    width: 8px;
    margin-top: 2px;
    padding-left: 5px;
`;

export const Section = styled.section`
    padding-top: ${(props) => `${props.paddingTop}px`};
    height: 569px;
    cursor: pointer;
    letter-spacing: 0.1rem;
    width: 100%;
    @media (max-width: 1765px) {
        background: url(${(props) => `${props.mediumUrl}`});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    @media (min-width: 1766px) {
        background: url(${(props) => `${props.largeUrl}`});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
`;
