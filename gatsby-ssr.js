const React = require("react");
const Layout = require("./src/components/layout");

exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
    setBodyAttributes({
        className: "my-body-class",
    });
};
exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
