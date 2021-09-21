import styled from "styled-components";

export const Section = styled.section`
    padding-bottom: 30px;
    background-color: #f5f5f7;
`;

export const ImageContainer = styled.div`
    height: ${(props) => props.height};
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media (max-width: 734px) {
        height: 70%;
    }
`;
export const Image = styled.img`
    margin-left: 40px;
    margin-right: 40px;
    height: ${(props) => `${props.height}px`};
    @media (max-width: 1068px) {
        height: 300px;
        margin-bottom: 110px;
    }
    @media (max-width: 734px) {
        height: 70%;
        margin-bottom: 0px;
    }
`;
export const Link = styled.span`
    color: #027fff;
    cursor: pointer;
`;
