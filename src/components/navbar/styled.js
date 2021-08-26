import styled from "styled-components";

export const Header = styled.header`
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 44px;
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

    .mobile {
        display: none;
    }
    .full {
    }
`;
export const NavItem = styled.li`
    cursor: pointer;
`;
export const MobileMenu = styled.div``;
export const Line = styled.span`
    .top {
    }
    .bottom {
    }
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
