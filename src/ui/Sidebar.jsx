import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { device } from "../../mediaQuery";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 5.6rem 2rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${device.mobileL} {
    display: none;
  }
`;

const StyledSidebarMobile = styled.aside`
  display: none;

  @media ${device.mobileL} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: var(--color-grey-0);
    display: flex;
    padding: 0.6rem 1rem;
    gap: 1.2rem;
    z-index: 170;
  }
`;

function Sidebar() {
  return (
    <>
      <StyledSidebar>
        <Logo background={true} />
        <MainNav />
      </StyledSidebar>

      <StyledSidebarMobile>
        <MainNav />
      </StyledSidebarMobile>
    </>
  );
}

export default Sidebar;
