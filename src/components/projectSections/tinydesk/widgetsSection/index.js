import React from "react";
import * as S from "./styled";
import TinyDeskWidgetsLarge from "../../../../images/tinydesk-widgets-large.png";
import TinyDeskWidgetsMedium from "../../../../images/tinydesk-widgets-medium.png";
import TinyDeskWidgetsSmall from "../../../../images/tinydesk-widgets-small.png";

import { GridContainer, Grid, GridHeader, SubSection } from "../../../common/";
export const TinyDeskWidgetSection = () => {
    return (
        <S.Section>
            <GridContainer column="100%">
                <Grid
                    largeUrl={TinyDeskWidgetsLarge}
                    mediumUrl={TinyDeskWidgetsMedium}
                    smallUrl={TinyDeskWidgetsSmall}
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
