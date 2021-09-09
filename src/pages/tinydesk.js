import React from "react";
import {
    Layout,
    TinydeskIntroSection,
    TinyDeskHomeSection,
    TinyDeskWidgetSection,
    TinyDeskBGSection,
} from "../components";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
    background: {
        backgroundColor: "#f5f5f7",
    },
});
const TinydeskPage = () => {
    const classes = useStyles();
    return (
        <Layout pageTitle="Tiny Desk">
            <TinydeskIntroSection />
            <TinyDeskHomeSection />
            <div className={classes.background}>
                <TinyDeskWidgetSection />
                <TinyDeskBGSection />
            </div>
        </Layout>
    );
};

export default TinydeskPage;
