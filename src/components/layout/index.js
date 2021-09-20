import * as React from "react";
import { NavBar } from "../";

import SEO from "./seo";
export const Layout = ({ pageTitle, children }) => {
    return (
        <>
            <SEO lang="en" pageTitle={pageTitle} meta={[]} />
            <NavBar />
            {children}
        </>
    );
};
