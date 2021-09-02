import React, { useRef } from "react";
import * as S from "./styled";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "../../../common/Sequence";
export const SuniIntroSection = () => {
    const ref = useRef();
    return (
        <div>
            <S.Section>
                <S.TypographyWrapper>
                    <S.Header>Suni</S.Header>
                    <S.SubHeader>University Schedule App</S.SubHeader>
                </S.TypographyWrapper>
            </S.Section>
            <Controller>
                <Scene duration="200%" triggerHook="onLeave" pin>
                    {(progress) => (
                        <S.SequenceWrapper>
                            <Sequence ref={ref} progress={progress} />
                        </S.SequenceWrapper>
                    )}
                </Scene>
            </Controller>
        </div>
    );
};
