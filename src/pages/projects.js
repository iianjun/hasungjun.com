import React from "react";

import { Layout } from "../components/";
import { ProjectSection } from "../components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    spacer: {
        paddingTop: "44px",
    },
});
const ProjectsPage = () => {
    const classes = useStyles();
    return (
        <Layout pageTitle="Projects">
            <div className={classes.spacer} />
            <ProjectSection />
        </Layout>
    );
};

export default ProjectsPage;
