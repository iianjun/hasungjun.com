import React, { useState } from "react";

import { Layout } from "../components/";
import { ContactIntro, ContactForm } from "../components/";
const ContactPage = () => {
    const [clickedBuy, setClickedBuy] = useState(false);
    return (
        <Layout pageTitle="Contact">
            <ContactIntro setClickedBuy={setClickedBuy} />
            <ContactForm clickedBuy={clickedBuy} />
        </Layout>
    );
};

export default ContactPage;
