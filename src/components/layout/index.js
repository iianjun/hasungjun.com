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
                    description
                }
            }
        }
    `);
    return (
        <>
            <Helmet htmlAttributes={{ lang: "en" }}>
                <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                />
                <meta property="og:url" content="https://www.hasungjun.com" />
                <meta property="og:title" content="Hasung Jun" />
                <meta charset="utf-8" />
                <title>
                    {`${pageTitle} | ${data.site.siteMetadata.title}`}
                </title>
                <link
                    rel="shortcut icon"
                    type="image/png"
                    href="src/images/favicon.ico"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="./images/apple-touch-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="./images/apple-touch-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="./images/apple-touch-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="./images/apple-touch-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="./images/apple-touch-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="./images/apple-touch-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-16x16.png"
                    sizes="16x16"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-32x32.png"
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-96x96.png"
                    sizes="96x96"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-128x128.png"
                    sizes="128x128"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-192x192.png"
                    sizes="192x192"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="./images/favicon-196x196.png"
                    sizes="196x196"
                />
            </Helmet>
            <NavBar />
            {children}
        </>
    );
};
