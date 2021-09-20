import React from "react";

import { Helmet } from "react-helmet";

import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ lang, pageTitle, meta }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        viewport
                        image
                    }
                }
            }
        `
    );
    const { title, description, author, viewport, image } = site.siteMetadata;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`${pageTitle} | ${title}`}
            meta={[
                {
                    name: "charset",
                    content: "utf-8",
                },
                {
                    name: "viewport",
                    content: viewport,
                },
                {
                    name: "description",
                    content: description,
                },
                {
                    property: "og:description",
                    content: description,
                },
                {
                    property: "og:type",
                    content: "website",
                },
                { property: "og:image", content: image },
                {
                    name: "twitter:image",
                    content: image,
                },
                {
                    name: "twitter:creator",
                    content: author,
                },
                {
                    name: "twitter:title",
                    content: title,
                },
                {
                    name: "twitter:description",
                    content: description,
                },
            ].concat(meta)}
        ></Helmet>
    );
};

export default SEO;
