import React from "react";
import { GridContent } from "../../../common";
import * as S from "./styled";
import { Grid } from "@material-ui/core";
export const MoreSection = () => {
    return (
        <S.Section>
            <Grid container>
                <Grid xs={12}>
                    <S.Header>Even more features</S.Header>
                </Grid>

                <Grid
                    lg={6}
                    md={6}
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    <div style={{ backgroundColor: "red" }}>dd</div>
                    {/* <GridContent></GridContent> */}
                </Grid>
                <Grid
                    lg={6}
                    md={6}
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    <div style={{ backgroundColor: "red" }}>dd</div>
                    {/* <GridContent></GridContent> */}
                </Grid>
            </Grid>
        </S.Section>
    );
};
