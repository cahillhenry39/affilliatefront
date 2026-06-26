import { useState } from "react";
import { Menu, X } from "lucide-react";
import styled from "styled-components";
import Logo from "../../ui/Logo";
import NavigationContent from "./NavigationContent";

const TopHeaderContianer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-grey-10);

  position: fixed;
  top: 0;
  right: 0;
  /* bottom: 0; */
  left: 0;
  z-index: 100;

  & img {
    width: 6rem;
  }

  & svg {
    width: 4rem;
    cursor: pointer;
  }
`;

function NavigationHeader() {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <TopHeaderContianer>
        <Logo />

        {showNav ? (
          <X onClick={() => setShowNav(false)} />
        ) : (
          <Menu onClick={() => setShowNav(true)} />
        )}
      </TopHeaderContianer>
      <NavigationContent showMini={showNav} setShowMini={setShowNav} />;
    </>
  );
}

export default NavigationHeader;
