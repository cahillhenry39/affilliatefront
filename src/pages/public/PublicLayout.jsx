import { Outlet } from "react-router-dom";

import styled from "styled-components";
import { device } from "../../../mediaQuery";
import Logo from "../../ui/Logo";

const StyledDispayOther = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 5rem;
  padding-right: 5rem;
  gap: 3rem;
  height: 100vh;

  background: linear-gradient(#000000cf, #000000c3),
    url("/main/hero-image.jpeg");

  & h2 {
    color: #ffff;
    text-align: center;
  }

  @media ${device.mobileL} {
    display: none;
  }
`;

const StyledDispayMobile = styled.section`
  display: none;

  @media ${device.mobileL} {
    display: block;

    background-color: red;
  }
`;

function PublicLayout() {
  return (
    <>
      <StyledDispayOther>
        <Logo isDarkBackround />
        <h2>
          We do not provide any view for this device. Please use mobile device
          or mobile mode only
        </h2>
      </StyledDispayOther>
      <StyledDispayMobile>
        <Outlet />
      </StyledDispayMobile>
      {/* <Chatboot /> */}
    </>
  );
}

export default PublicLayout;
