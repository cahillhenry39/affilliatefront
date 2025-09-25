import styled, { css } from "styled-components";
import Logo from "../../ui/Logo";

import { HiOutlineViewGrid } from "react-icons/hi";
import FirstCircle from "../../features/Home/FirstCircle";
import SecondCircle from "../../features/Home/SecondCircle";
import { expand } from "../../ui/Animations";
import { useDarkMode } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import useUser from "../../features/authentication/useUser";
import LogoMarquee from "../../ui/LogoMarquee";

const StyledHome = styled.section`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0;

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-50);
        `
      : css`
          background-image: url("/app/background/w4.jpg");
          background-size: cover;
        `}
`;

const WelcomIntro = styled.div`
  & h1 {
    font-size: 4rem;
    text-align: center;
    color: var(--color-brand-800);
    text-transform: capitalize;
  }

  & h3 {
    font-size: 1.6rem;
    padding: 0 3rem;
    text-align: center;

    color: var(--color-grey-700);
  }

  ${(props) =>
    props.$isDarkMode === "true" &&
    css`
      & h1 {
        color: var(--color-brand-500);
      }
    `}
`;

const ButtonSectionDiv = styled.div`
  margin-top: 5rem;
  position: relative;
`;

const MainBtn = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  font-size: 1.4rem;
  background-color: var(--color-brand-700);
  color: var(--color-brand-100);
  border: none;
  box-shadow: var(--shadow-lg);

  transform: none;
  animation: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.51rem;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  & p {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  & svg {
    width: 3rem;
    height: 3rem;
    animation: ${expand} 5.5s infinite;
  }
`;

function HomeCopy() {
  const { isDarkMode } = useDarkMode();
  const { isAuthenticated } = useUser();

  return (
    <StyledHome $isDarkMode={isDarkMode.toString()}>
      <Logo />
      <WelcomIntro $isDarkMode={isDarkMode.toString()}>
        <h1>Welcome you to bOMERG</h1>

        <h3>The best affiliate marketing system that work and easy to use</h3>
      </WelcomIntro>

      <ButtonSectionDiv>
        <FirstCircle>
          <SecondCircle />
        </FirstCircle>

        {isAuthenticated ? (
          <Link to="/app">
            <MainBtn>
              <HiOutlineViewGrid />
              <p>Dashboard</p>
            </MainBtn>
          </Link>
        ) : (
          <Link to="member/auth">
            <MainBtn>
              <HiOutlineViewGrid />
              <p>Get Started</p>
            </MainBtn>
          </Link>
        )}
      </ButtonSectionDiv>

      <LogoMarquee />
    </StyledHome>
  );
}

export default HomeCopy;
