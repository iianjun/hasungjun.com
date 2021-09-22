module.exports = {
    siteMetadata: {
        siteUrl: "https://www.hasungjun.com",
        title: "Hasung Jun",
        description: "Portfolio Website by Hasung Jun",
        author: "Hasung Jun",
        viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
        image: "https://res.cloudinary.com/commandt/image/upload/v1632164731/about-emoji_rsbgtr.png",
    },
    plugins: [
        "gatsby-plugin-styled-components",
        "gatsby-plugin-gatsby-cloud",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "Hasung Jun",
                short_name: "Hasung Jun",
                start_url: "/",
                description: "Portfolio Website by Hasung Jun",
                display: "standalone",
                lang: "en",
                icon: "src/images/icons/icon-128x128.png",
                icons: [
                    {
                        src: "src/images/icons/icon-16x16",
                        sizes: "16x16",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-32x32",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-48x48",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-60x60",
                        sizes: "60x60",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-72x72",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-96x96",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-114x114",
                        sizes: "114x114",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-120x120",
                        sizes: "120x120",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-128x128",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-144x144",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-152x152",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-180x180",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-192x192",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-196x196",
                        sizes: "196x196",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-256x256",
                        sizes: "196x196",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-384x384",
                        sizes: "196x196",
                        type: "image/png",
                    },
                    {
                        src: "src/images/icons/icon-512x512",
                        sizes: "196x196",
                        type: "image/png",
                    },
                ],
            },
        },
    ],
};
