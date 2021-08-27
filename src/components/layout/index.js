import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { NavBar } from "..";
import { Helmet } from "react-helmet";
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
            <Helmet
                title={`${data.site.siteMetadata.title} | ${pageTitle}`}
                htmlAttributes={{ lang: "en" }}
            />
            <div>
                {/* <header>{data.site.siteMetadata.title}</header> */}

                <NavBar />
                <main>{children}</main>
            </div>
        </>
    );
};
