import React, { useState } from "react";
import * as S from "./styled";
import logo from "../../images/logo.svg";
import { Cross as Hamburger } from "hamburger-react";
import { Link } from "gatsby";
import { NavigationLinks } from "../navigation-links";
export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <S.Header>
            <S.Wrapper className="container">
                <S.Nav>
                    <S.Mobile>
                        <S.NavList>
                            <S.NavLink onClick={handleOpen}>
                                <S.MenuIcon>
                                    {/* <S.MenuIconLabel>
                                        <S.LineTopWrapper>
                                            <S.LineTop />
                                        </S.LineTopWrapper>
                                        <S.LineBottomWrapper>
                                            <S.LineBottom />
                                        </S.LineBottomWrapper>
                                    </S.MenuIconLabel> */}
                                    <Hamburger size={17} color="#ffffff" />
                                    <NavigationLinks isOpen={isOpen} />
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
                    <S.Full>
                        <S.NavList>
                            <S.NavItem className="nav-item-hidden">
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
                            <S.NavItem>
                                <Link to="/">
                                    <S.NavLink>Home</S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem>
                                <Link to="/about">
                                    <S.NavLink>About</S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem>
                                <Link to="/projects">
                                    <S.NavLink>Projects</S.NavLink>
                                </Link>
                            </S.NavItem>
                            <S.NavItem>
                                <Link to="/contact">
                                    <S.NavLink>Contact</S.NavLink>
                                </Link>
                            </S.NavItem>
                        </S.NavList>
                    </S.Full>
                </S.Nav>
            </S.Wrapper>
        </S.Header>
    );
};
