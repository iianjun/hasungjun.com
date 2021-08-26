import styled from "styled-components";

export const TextField = styled.input`
    border: 1px solid #bbb;
    outline: 0;
    width: 100%;
    max-width: 527px;
    padding-left: 10px;
    padding-right: 40px;
    height: 54px;
    font-family: inherit;
    font-weight: 300;
    border-radius: 3px;
    letter-spacing: normal;
    color: #333;
    border: 1px solid #bbb;
    -webkit-appearance: none;
    font-size: 17px;
    @media (max-width: 527px) {
        max-width: 300px;
    }
`;
export const TextArea = styled.textarea`
    border: 1px solid #bbb;
    outline: 0;
    width: 100%;
    max-width: 527px;
    padding-left: 10px;
    padding-right: 40px;
    padding-top: 10px;
    height: 150px;
    font-family: inherit;
    font-weight: 300;
    border-radius: 3px;
    letter-spacing: normal;
    color: #333;
    border: 1px solid #bbb;
    -webkit-appearance: none;
    font-size: 17px;
    @media (max-width: 527px) {
        max-width: 300px;
    }
`;
