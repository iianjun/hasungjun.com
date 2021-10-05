import React, { useState } from "react";

import { Layout } from "../components/";
import { ContactIntro } from "../components/";
const ContactPage = () => {
    return (
        <Layout pageTitle="Contact">
            <ContactIntro />
        </Layout>
    );
};

export default ContactPage;
