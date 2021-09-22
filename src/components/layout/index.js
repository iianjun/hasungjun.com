import * as React from "react";
import { NavBar } from "../";

import Seo from "./seo";
export const Layout = ({ pageTitle, children }) => {
    return (
        <>
            <Seo lang="en" pageTitle={pageTitle} meta={[]} />
            <NavBar />
            {children}
        </>
    );
};
