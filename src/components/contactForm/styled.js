import styled from "styled-components";
import contactImg from "../../images/contact.jpg";

export const Wrapper = styled.section`
    margin-top: 10px;
    display: ${(props) => (props.$visible ? "block" : "none")};
    background: url(${contactImg});
    background-size: auto 73.6rem;
    background-position: center;
    background-repeat: no-repeat;
    @media (min-width: 2025px) {
        background-size: 100%;
    }
`;

export const Title = styled.div`
    color: #333;
    text-align: center;
    padding-top: 5.5rem;

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export const TitleHeading = styled.h1`
    font-size: 40px;
    line-height: 1.05;
    font-weight: 500;
    font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica",
        "Arial", sans-serif;
    visibility: visible;
    width: 100%;
`;

export const Form = styled.form`
    margin-top: 10px;
    width: 100%;
    max-width: 600px;

    > * {
        margin: 20px 0;
    }
`;

export const AOSContainer = styled.div``;
