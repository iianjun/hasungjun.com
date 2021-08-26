import React from "react";
import * as S from "./styled";

export const AppleButton = (props) => {
    return <S.Button onClick={props.onClick}>{props.children}</S.Button>;
};
