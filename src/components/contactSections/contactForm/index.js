import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { AppleButton, Input } from "../../common";
import { Element } from "react-scroll";
import Aos from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";

const placeholders = ["Name", "Email", "Subject", "Message"];

export const ContactForm = (props) => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const elements = [name, email, subject, message];
        if (areEmpty(elements)) {
            alert("Please Fill all information");
            return;
        }
        const data = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };
        emailjs.send(
            "service_ayf94ac",
            "template_1hmrjrk",
            data,
            "user_eN6NWJuYvY7CjdtzKs2Tr"
        );
        alert("Sent!");
    };
    const areEmpty = (elements) => {
        for (const ele of elements) {
            if (ele === "") {
                return true;
            }
        }
        return false;
    };
    return (
        <S.AOSContainer
            data-aos={props.clickedBuy ? "" : "fade-in"}
            className="animation"
        >
            <Element name="contactForm" className="element">
                <S.Wrapper $visible={props.clickedBuy}>
                    <S.Title>
                        <S.TitleHeading>Contact Me</S.TitleHeading>
                        <S.Form onSubmit={onSubmit} autoComplete="off">
                            {placeholders.map((placeholder) => (
                                <Input
                                    key={placeholder}
                                    placehoder={placeholder}
                                    size={
                                        placeholder === "Message"
                                            ? "large"
                                            : "normal"
                                    }
                                    for={
                                        placeholder === "Name"
                                            ? setName
                                            : placeholder === "Email"
                                            ? setEmail
                                            : placeholder === "Subject"
                                            ? setSubject
                                            : setMessage
                                    }
                                />
                            ))}
                            <br />

                            <AppleButton>Submit</AppleButton>
                        </S.Form>
                    </S.Title>
                </S.Wrapper>
            </Element>
        </S.AOSContainer>
    );
};
