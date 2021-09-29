import React, { useState } from "react";
import * as S from "./styled";
import logo from "../../images/logo.svg";

import { Link } from "gatsby";

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <S.Header>
            <S.Wrapper>
                <S.Nav>
                    <S.Mobile>
                        <S.NavList>
                            <S.NavLink>
                                <S.MenuIcon onClick={handleClick}>
                                    <S.LineTopWrapper
                                        className={isOpen ? "active" : ""}
                                    >
                                        <S.LineTop
                                            className={isOpen ? "active" : ""}
                                        />
                                    </S.LineTopWrapper>
                                    <S.LineBottomWrapper
                                        className={isOpen ? "active" : ""}
                                    >
                                        <S.LineBottom
                                            className={isOpen ? "active" : ""}
                                        />
                                    </S.LineBottomWrapper>
                                </S.MenuIcon>
                            </S.NavLink>
                            <S.MobileLogoWrapper>
                                <S.NavItem className="mobile">
                                    <Link to="/">
                                        <S.NavLink>
                                            <img
                                                className="logo-full"
                                                src={logo}
                                                alt="logo"
                                            />
                                        </S.NavLink>
                                    </Link>
                                </S.NavItem>
                            </S.MobileLogoWrapper>
                        </S.NavList>
                    </S.Mobile>
                    <S.Full className={isOpen ? "active" : ""}>
                        <S.NavList className={isOpen ? "desktop active" : ""}>
                            <S.NavItem
                                className="nav-item-hidden"
                                isOpen={isOpen}
                            >
                                <Link to="/">
                                    <S.NavLink>
                                        <img
                                            className="logo-full"
                                            src={logo}
                                            alt="logo"
                                        />
                                    </S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem className="desktop-item">
                                <Link to="/">
                                    <S.NavLink
                                        className={isOpen ? "active" : ""}
                                    >
                                        Home
                                    </S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem className="desktop-item">
                                <Link to="/about">
                                    <S.NavLink
                                        className={isOpen ? "active" : ""}
                                    >
                                        About
                                    </S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem className="desktop-item">
                                <Link to="/projects">
                                    <S.NavLink
                                        className={isOpen ? "active" : ""}
                                    >
                                        Projects
                                    </S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem className="desktop-item">
                                <Link to="/contact">
                                    <S.NavLink
                                        className={isOpen ? "active" : ""}
                                    >
                                        Contact
                                    </S.NavLink>
                                </Link>
                            </S.NavItem>
                        </S.NavList>
                    </S.Full>
                </S.Nav>
            </S.Wrapper>
        </S.Header>
    );
};
