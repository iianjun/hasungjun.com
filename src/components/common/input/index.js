import React from "react";
import * as S from "./styled";

export const Input = (props) => {
    const onChangeTextField = (e) => {
        props.for(e.target.value);
    };
    const onChangeTextArea = (e) => {
        props.for(e.target.value);
    };
    return props.size === "normal" ? (
        <S.TextField
            placeholder={props.placehoder}
            onChange={onChangeTextField}
        />
    ) : (
        <S.TextArea
            placeholder={props.placehoder}
            onChange={onChangeTextArea}
        />
    );
};
