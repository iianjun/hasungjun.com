import React from "react";
import * as S from "./styled";
import { GridContainer, Grid, GridHeader, SubSection } from "../../../common";
import TinyDeskEditBackground from "../../../../images/about/tinydesk-edit-background.png";
import TinyDeskBookmarks from "../../../../images/about/tinydesk-bookmarks.png";
import { StaticImage } from "gatsby-plugin-image";
export const TinyDeskBGSection = () => {
    const handleOpenUnsplash = () => {
        window.open("https://unsplash.com");
    };
    return (
        <S.Section>
            <GridContainer column="65% 35%">
                <Grid backgroundColor="#ffffff" height={550}>
                    <GridHeader>Customize Background</GridHeader>
                    <SubSection>
                        Change browser's background easily. Choose the best
                        background from
                        <S.Link onClick={handleOpenUnsplash}> Unsplash</S.Link>.
                        Never get sick of your customized background, unlike
                        plain background from other browsers.
                    </SubSection>
                    <S.ImageContainer height="80%">
                        <S.Image src={TinyDeskEditBackground} height={400} />
                    </S.ImageContainer>
                </Grid>
                <Grid
                    backgroundColor="#ffffff"
                    height={550}
                    largeUrl={TinyDeskBookmarks}
                    mediumUrl={TinyDeskBookmarks}
                    smallUrl={TinyDeskBookmarks}
                >
                    <GridHeader>Bookmarks</GridHeader>
                </Grid>
            </GridContainer>
        </S.Section>
    );
};
