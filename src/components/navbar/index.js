import React from "react";
import * as S from "./styled";
import logo from "../../images/logo.svg";

import { Link } from "gatsby";
export const NavBar = () => {
    return (
        <S.Header>
            <S.Wrapper className="container">
                <S.Nav>
                    <S.Mobile>
                        <S.NavList>
                            <S.NavLink href="#open-menu" role="button">
                                <S.MenuIcon>
                                    <S.MenuIconLabel>
                                        <S.LineTopWrapper>
                                            <S.LineTop />
                                        </S.LineTopWrapper>
                                        <S.LineBottomWrapper>
                                            <S.LineBottom />
                                        </S.LineBottomWrapper>
                                    </S.MenuIconLabel>
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
                    <S.Menu></S.Menu>
                </S.Nav>
            </S.Wrapper>
        </S.Header>
    );
};
