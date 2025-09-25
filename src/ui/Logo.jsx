import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";
import { useDarkMode } from "../context/DarkModeContext";

const ImageComponent = styled(NavLink)``;

const Image = styled.img`
  width: 26.4rem;
`;

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 20.6rem;
  width: auto;
`;

const mainLogoIcon = "/main/taskitlogoicon.png";
const mainLogoDark = "/main/logomaindark.png";
const mainLogoLight = "/main/logomainlight.png";

const logoDark = "/main/logodark.png";
const logoLight = "/main/logolight.png";

function Logo({ background, isPublic, isDarkBackround }) {
  const { isDarkMode } = useDarkMode();

  const src = isDarkBackround
    ? mainLogoDark
    : isDarkMode
    ? mainLogoDark
    : mainLogoLight;

  return (
    <>
      {background ? (
        <Link to="/">
          <StyledLogo>{/* <Img src={src} alt="Bomerg Logo" /> */}</StyledLogo>
        </Link>
      ) : (
        <ImageComponent to="/">
          <Image
            $isPublic={isPublic?.toString()}
            src={src}
            alt="Taskiit services Logo"
          />
        </ImageComponent>
      )}
    </>
  );
}

export default Logo;
