import styled from "styled-components";

export const Wrapper = styled.div`
    padding-top: ${(props) => `${props.paddingTop}px`};
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

    @media (min-height: 1185px) {
        height: 50vh;
    }
`;
