import styled from "styled-components";

export const Header = styled.header`
    position: fixed;
    top: 0;
    z-index: 300;
    width: 100%;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
`;
export const Wrapper = styled.div``;

export const Nav = styled.nav``;

export const NavList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin: 0 -10px; */

    @media (max-width: 767px) {
        &.desktop {
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 0vh;
            background: #000;
            align-items: center;
            justify-content: flex-start;

            overflow: hidden;
            z-index: -1;
            visibility: visible;
            transition: visibility 0s linear 1s;
        }
        &.active {
            height: 100vh;
        }
    }
`;
export const NavItem = styled.li`
    cursor: pointer;
    @media (max-width: 767px) {
        &.nav-item-hidden {
            visibility: hidden;
        }
        &.desktop-item {
            width: 80vw;
            border-bottom: 1px gray solid;
            padding: 15px 0px;
        }
    }
`;

export const MobileLogoWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

export const Full = styled.div`
    @media (max-width: 767px) {
        &.active {
            display: block;
        }
        display: none;
    }
`;

export const Mobile = styled.div`
    display: none;
    @media (max-width: 767px) {
        display: block;
    }
`;

export const MenuIcon = styled.li`
    left: 0;
    position: absolute;
    z-index: 2;
    top: 0;
    width: 48px;
    border-bottom: none;
    cursor: pointer;
`;

export const LineTopWrapper = styled.span`
    position: absolute;
    z-index: 3;
    top: 9px;
    left: 9px;
    width: 30px;
    height: 30px;

    &.active {
        transform: rotate(45deg);
        transition: transform 0.3192s cubic-bezier(0.04, 0.04, 0.12, 0.96)
            0.1008s;
    }
`;
export const LineBottomWrapper = styled.span`
    position: absolute;
    z-index: 3;
    top: 9px;
    left: 9px;
    width: 30px;
    height: 30px;

    &.active {
        transform: rotate(-45deg);
        transition: transform 0.3192s cubic-bezier(0.04, 0.04, 0.12, 0.96)
            0.1008s;
    }
`;
export const LineTop = styled.span`
    display: block;
    width: 17px;
    height: 1px;
    background: #fff;
    border-radius: 0.5px;
    position: absolute;
    left: 7px;
    z-index: 1;
    top: 14px;

    transform: translateY(-3px);

    &.active {
        transform: none;
        transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    }
`;
export const LineBottom = styled.span`
    display: block;
    width: 17px;
    height: 1px;
    background: #fff;
    border-radius: 0.5px;
    position: absolute;
    left: 7px;
    z-index: 1;
    bottom: 14px;
    transform: translateY(3px);

    &.active {
        transform: none;
        transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    }
`;

export const NavLink = styled.div`
    font-size: 1.4rem;
    color: #f5f5f7;
    opacity: 0.8;
    padding: 0 1rem;
    &:hover {
        opacity: 1;
    }

    .logo-full {
        width: 26px;
        height: 44px;
        display: flex;
        align-items: center;
        margin-right: 13px;
        cursor: pointer;
    }
    &.active {
        font-weight: 300;
        font-size: 17px;
    }
`;
