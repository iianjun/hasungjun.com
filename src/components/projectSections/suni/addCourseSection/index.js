import React, { useRef } from "react";
import * as S from "./styled";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "../../../common/Sequence";

export const AddCourseSection = () => {
    const ref = useRef();

    return (
        <S.Wrapper>
            <S.Section>
                <S.TypographyWrapper>
                    <S.SubHeadline>
                        <b>Suni </b>
                        delivers fast and easy access to students to add
                        courses. It can avoid conflicts between the classes and
                        is an efficient tool to enroll in the courses much
                        faster than others. All you have to do is choose the
                        courses, and it will automatically generate the schedule
                        or alert you when it has conflicts.
                    </S.SubHeadline>
                </S.TypographyWrapper>
                <Controller>
                    <Scene duration="200%" triggerHook="onLeave" pin>
                        {(progress) => (
                            <S.SequenceWrapper>
                                <Sequence
                                    ref={ref}
                                    progress={progress}
                                    target="suni-add-course"
                                />
                            </S.SequenceWrapper>
                        )}
                    </Scene>
                </Controller>
            </S.Section>
        </S.Wrapper>
    );
};
