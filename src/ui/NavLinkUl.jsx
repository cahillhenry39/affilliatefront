import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "./Button";
import DarkModeToggle from "./DarkModeToggle";
import { device } from "../../mediaQuery";
import { useDarkMode } from "../context/DarkModeContext";
import useUser from "../features/authentication/useUser";
import UserAvatar from "../features/authentication/UserAvatar";

import Google from "../../Google";

const NavLinkUlComponent = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  gap: 2rem;

  @media ${device.tablet} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    font-size: 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden;

    ${(props) =>
      props.$isDark === "false"
        ? css`
            background-image: url("/images/vectors/background.jpg");
          `
        : css`
            background-image: none;
            background-color: var(--color-grey-0);
          `}

    ${(props) =>
      props.$change === "open"
        ? css`
            display: flex;
            opacity: 1;
          `
        : css`
            opacity: 0;
            display: none;
          `}
  }
`;

const Links = styled(NavLink)`
  color: var(--color-grey-600);

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-700);
    border-bottom: 3px solid var(--color-brand-600);
  }
`;

const LinksFooter = styled(NavLink)`
  color: var(--color-brand-100);

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-200);
    border-bottom: 3px solid var(--color-brand-600);
  }
`;

const NavLinkUlComponentFooter = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const HelpAvatar = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

const ToggleLI = styled.li`
  & svg {
    ${(props) =>
      props.$change === "open" &&
      css`
        width: 3.5rem;
        height: 3.5rem;
      `}
  }
`;

function NavLinkUl({ footer, change, setChange }) {
  const { isAuthenticated } = useUser();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      {!footer ? (
        <NavLinkUlComponent $change={change} $isDark={isDarkMode.toString()}>
          <li>
            <Links to="/">Home</Links>
          </li>

          <li>
            <Links to="/about-us">About us</Links>
          </li>
          <li>
            <Links to="/news">News</Links>
          </li>

          <li>
            <Links to="/contact-us">Contact us</Links>
          </li>

          {isAuthenticated ? (
            <>
              <HelpAvatar>
                <UserAvatar />
              </HelpAvatar>
            </>
          ) : (
            <>
              <li onClick={() => setChange("close")}>
                <Link to="/member/signup">
                  <Button type="primary" change={change}>
                    sign up
                  </Button>
                </Link>
              </li>

              <li onClick={() => setChange("close")}>
                <Link to="/member/login">
                  <Button type="secondary" change={change}>
                    login
                  </Button>
                </Link>
              </li>
            </>
          )}

          <ToggleLI $change={change} onClick={() => setChange("close")}>
            <DarkModeToggle />
          </ToggleLI>
        </NavLinkUlComponent>
      ) : (
        <NavLinkUlComponentFooter>
          <li>
            <LinksFooter to="/">Home</LinksFooter>
          </li>

          <li>
            <LinksFooter to="/about-us">About us</LinksFooter>
          </li>
          <li>
            <LinksFooter to="/news">News</LinksFooter>
          </li>

          <li>
            <LinksFooter to="/contact-us">Contact us</LinksFooter>
          </li>

          <li>
            <LinksFooter to="/app">Mobile App</LinksFooter>
          </li>

          <li>
            <LinksFooter to="/legal/terms-of-use">Terms of use</LinksFooter>
          </li>

          <Google />
        </NavLinkUlComponentFooter>
      )}
    </>
  );
}

export default NavLinkUl;
