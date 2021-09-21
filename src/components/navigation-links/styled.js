import styled from "styled-components";

export const Wrapper = styled.div`
    z-index: 1000;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #1d1d1f;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    height: 0%;
    color: black;
    transition: opacity 0.4s visibility 0s linear 1s;
    .open {
        opacity: 1;
        visibility: visible;
        height: 100vh;
    }
`;
