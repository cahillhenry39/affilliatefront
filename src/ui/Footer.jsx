import styled from "styled-components";
import { Link } from "react-router-dom";

import NavLinkUl from "./NavLinkUl";
import SocialConnect from "./SocialConnect";
import Address from "./Address";
import { device } from "../../mediaQuery";

const FooterComponent = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  gap: 2.5rem;
  background-color: var(--color-brand-800);
  margin: 0 auto;
  padding: 4rem 8rem;

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
    padding: 4rem 4rem;
  }
`;

const LogoAndSlogan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--color-brand-100);
`;

const Slogan = styled.div``;

const RigthReserved = styled.p`
  font-size: 1.3rem;
  color: var(--color-brand-100);
  justify-self: center;

  grid-column: 1 / -1;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 6.6rem;
  width: auto;
`;

function Footer() {
  return (
    <FooterComponent>
      <LogoAndSlogan>
        <LogoContainer>
          <Link to="/">
            <StyledLogo>
              <Img
                src="/main/darklogo.png"
                alt="Loaner Bin financial services Logo"
              />
            </StyledLogo>
          </Link>
        </LogoContainer>
        <Slogan>
          Your financial growth, our concern. Fast, secured and reliable.
        </Slogan>

        <SocialConnect />
      </LogoAndSlogan>

      <Address />

      <NavLinkUl footer={true} />

      <RigthReserved>
        All right reserved &copy; Loanerbin financial services, LLC.{" "}
        {new Date().getFullYear()} RTC: A233BC896, since 2019
      </RigthReserved>
    </FooterComponent>
  );
}

export default Footer;
