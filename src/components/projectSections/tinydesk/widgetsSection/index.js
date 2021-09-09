import React from "react";
import * as S from "./styled";
import TinyDeskWidgets from "../../../../images/tinydesk-widgets.png";
import { GridContainer, Grid, GridHeader, SubSection } from "../../../common/";
export const TinyDeskWidgetSection = () => {
    return (
        <S.Section>
            <GridContainer column="110%">
                <Grid
                    largeUrl={TinyDeskWidgets}
                    backgroundColor="#ffffff"
                    height={550}
                >
                    <GridHeader>Widgets</GridHeader>
                    <SubSection>
                        Opens like a charm. Add notes, todos, and schedules on
                        your homepage to maximize work efficiency. It will be
                        the first thing you will be when you open a browser.
                    </SubSection>
                </Grid>
            </GridContainer>
        </S.Section>
    );
};
