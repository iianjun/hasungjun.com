import * as React from "react";
import { NavBar } from "..";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${pageTitle} | ${data.site.siteMetadata.title}`}</title>
            </Helmet>
            <NavBar />
            {children}
        </>
    );
};
