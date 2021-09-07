import React, { useState, useEffect, useRef } from "react";
import * as S from "./styled";
import { LearnMore } from "../../../common";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "../../../common/Sequence";
import { SuniImages } from "../../../../images/suni-intro-animation";

export const SuniIntroSection = () => {
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    useEffect(() => {
        if (SuniImages) {
            SuniImages.forEach((suniImage) => {
                const image = new Image();
                image.src = suniImage;
            });
            setLoading(true);
        }
    }, []);

    if (!loading) {
        return null;
    }
    return (
        <div>
            <S.Section>
                <S.TypographyWrapper>
                    <S.Header>Suni</S.Header>
                    <S.SubHeader>University Schedule App</S.SubHeader>

                    <LearnMore
                        title="GitHub"
                        to="https://github.com/iianjun/Suni"
                        marginTop="10"
                    />
                    <LearnMore
                        title="Download"
                        to="https://apps.apple.com/us/app/순이/id1554029990"
                        marginTop="10"
                    />
                </S.TypographyWrapper>
            </S.Section>
            <Controller>
                <Scene duration="200%" triggerHook="onLeave" pin>
                    {(progress) => (
                        <S.SequenceWrapper>
                            <Sequence
                                ref={ref}
                                progress={progress}
                                target="suni-intro"
                            />
                        </S.SequenceWrapper>
                    )}
                </Scene>
            </Controller>
        </div>
    );
};
