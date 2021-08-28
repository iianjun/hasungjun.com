import * as React from "react";

import { NavBar } from "..";

export const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};
