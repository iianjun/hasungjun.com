import React from "react";

import {
    Layout,
    MoreSection,
    SuniIntroSection,
    ScheduleSection,
} from "../components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    blackOut: {
        backgroundColor: "black",
    },
    whiteOut: {
        backgroundColor: "white",
    },
});
const SuniPage = () => {
    const classes = useStyles();
    return (
        <Layout pageTitle="Suni">
            <div className={classes.blackOut}>
                <SuniIntroSection />
                <ScheduleSection />
            </div>
            <div className={classes.whiteOut}>{/* <MoreSection /> */}</div>
        </Layout>
    );
};

export default SuniPage;
