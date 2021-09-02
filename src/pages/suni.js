import React from "react";
import { Layout } from "../components";
import { SuniIntroSection } from "../components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    blackOut: {
        backgroundColor: "black",
    },
});
const SuniPage = () => {
    const classes = useStyles();
    return (
        <Layout pageTitle="Suni">
            <div className={classes.blackOut}>
                <SuniIntroSection />
            </div>
        </Layout>
    );
};

export default SuniPage;
