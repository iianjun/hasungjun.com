import styled from "styled-components";

export const Header = styled.header`
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 48px;
    @media (max-width: 767px) {
        height: 44px;
    }
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
    margin: 0 -10px;
`;
export const NavItem = styled.li`
    cursor: pointer;
`;

export const MobileLogoWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

export const Full = styled.div`
    @media (max-width: 767px) {
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
`;

export const MenuIconLabel = styled.label`
    display: block;
    position: absolute;
    opacity: 0.8;
    z-index: 3;
    top: 0;
    width: 48px;
    height: 48px;
    cursor: pointer;
    -webkit-transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const LineTopWrapper = styled.span`
    position: absolute;
    z-index: 3;
    top: 9px;
    left: 9px;
    width: 30px;
    height: 30px;
    -webkit-transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-transition: -webkit-transform 0.1806s
        cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96),
        -webkit-transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    -webkit-transform: none;
    transform: none;
    z-index: 4;
`;
export const LineBottomWrapper = styled.span`
    position: absolute;
    z-index: 3;
    top: 9px;
    left: 9px;
    width: 30px;
    height: 30px;
    -webkit-transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-transition: -webkit-transform 0.1806s
        cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: -webkit-transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96),
        -webkit-transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    -webkit-transform: none;
    transform: none;
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
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-transition: -webkit-transform 0.1596s
        cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
    transition: -webkit-transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84)
        0.1008s;
    transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
    transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s,
        -webkit-transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
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
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
    -webkit-transition: -webkit-transform 0.1596s
        cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
    transition: -webkit-transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84)
        0.1008s;
    transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
    transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s,
        -webkit-transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
`;

export const NavLink = styled.a`
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
    }
`;
