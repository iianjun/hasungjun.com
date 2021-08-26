import React from 'react'
import * as S from './styled'
import logo from '../../images/logo.svg'

import { Link } from 'gatsby'
export const NavBar = () => {
    return (
        <S.Header>
            <S.Wrapper className="container">
                <S.Nav>
                    <S.NavList className="mobile">
                        <S.NavItem>
                            <S.MobileMenu>
                                <S.Line className="top" />
                                <S.Line className="bottom" />
                            </S.MobileMenu>
                        </S.NavItem>
                        <S.NavItem>
                            {/* <S.NavLink className="logo">
                                <img src={logo} onClick={onClickHome} />
                            </S.NavLink> */}
                        </S.NavItem>
                    </S.NavList>
                    <S.NavList className="full">
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
                                <S.NavLink>Projects </S.NavLink>
                            </Link>
                        </S.NavItem>
                        <S.NavItem>
                            <Link to="/contact">
                                <S.NavLink>Contact </S.NavLink>
                            </Link>
                        </S.NavItem>
                    </S.NavList>
                </S.Nav>
            </S.Wrapper>
        </S.Header>
    )
}
