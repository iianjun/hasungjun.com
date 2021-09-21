import React from "react";
import * as S from "./styled";

export const NavigationLinks = ({ isOpen }) => {
    console.log(isOpen);
    return (
        <S.Wrapper className={isOpen ? "open" : "closed"}>
            ddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwddddddwdwdwdwdwdwdd
        </S.Wrapper>
    );
};
