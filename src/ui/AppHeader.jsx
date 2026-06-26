import styled from "styled-components";

import UserAvatar from "../features/authentication/UserAvatar";
import { device } from "../../mediaQuery";
import Logo from "./Logo";
import AppHeaderMenu from "./AppHeaderMenu";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  /* border-bottom: 1px solid var(--color-grey-100); */

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobileL} {
    gap: 0.6rem;
    padding: 1rem 0.5rem 0.1rem;
  }

  background-color: var(--color-grey-10);
`;

const LogoDiv = styled.div`
  width: 20%;
  opacity: 0;

  @media ${device.mobileL} {
    opacity: 1;
  }
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media ${device.mobileL} {
    gap: 0.6rem;
  }
`;

function AppHeader() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledHeader $isDarkMode={isDarkMode?.toString()}>
      <LogoDiv>
        <Logo />
      </LogoDiv>

      <MenuDiv>
        <UserAvatar />
        <AppHeaderMenu />
      </MenuDiv>
    </StyledHeader>
  );
}

export default AppHeader;
