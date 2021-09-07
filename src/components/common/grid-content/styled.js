import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #f5f5f7;
    height: 700px;
    margin: 30px 15px;
    padding: 38px 40px 0px;
    border-radius: 30px;
    background-position: center;
    background-repeat: no-repeat;

    background-image: url(${(props) => props.largeUrl});
    background-size: auto 740px;

    @media (max-width: 599px) {
        background: url(${(props) => props.mediumUrl});
        width: 550px;
        margin: auto;
    }
`;
