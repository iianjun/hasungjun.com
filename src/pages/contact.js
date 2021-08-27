import React, { useState } from "react";

import { Layout, ContactIntro, ContactForm } from "../components/";
const ContactPage = () => {
    const [clickedBuy, setClickedBuy] = useState(false);
    return (
        <Layout>
            <ContactIntro setClickedBuy={setClickedBuy} />
            <ContactForm clickedBuy={clickedBuy} />
        </Layout>
    );
};

export default ContactPage;