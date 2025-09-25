import styled from "styled-components";
import NavigationHeader from "../../features/Home/NavigationHeader";
import LogoMarquee from "../../ui/LogoMarquee";
import { useNavigate } from "react-router-dom";
import useUser from "../../features/authentication/useUser";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  /* height: calc(var(--real-vh, 1vh) * 100); */
  height: 100vh;
  width: 100%;
  overflow: hidden;

  padding-top: 10rem;
  padding-bottom: 10rem;

  background: linear-gradient(#000000cf, #000000c3),
    url("/main/hero-image.jpeg");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
`;

const WelcomIntro = styled.div`
  & h1 {
    font-size: 4rem;
    text-align: center;
    color: var(--color-brand-600);
    text-transform: capitalize;
    padding: 0rem 1rem;
  }

  & h3 {
    font-size: 1.6rem;
    padding: 0 3rem;
    text-align: center;
    margin-top: 1rem;
    color: #fff;
    /* white-space: normal;
    overflow-wrap: normal;
    word-break: keep-all; */

    hyphens: none;
    -webkit-hyphens: none;
  }

  & p {
    font-size: 1.4rem;
    padding: 0 2rem;
    text-align: center;
    margin-top: 1rem;
    color: #e6e6e6;
    hyphens: none;
    -webkit-hyphens: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  margin-top: 2rem;

  & button {
    padding: 2rem;
    font-size: 1.6rem;
    text-transform: capitalize;
    border-radius: 11px;
  }
`;
const GetStartedButton = styled.button`
  color: #fff;
  font-weight: 600;
  background-color: var(--color-brand-800);
  border: none;
`;
const DemoButton = styled.button`
  background-color: transparent;
  color: #e6e6e6;
  border: 1px solid #cccc;
`;

const MarqueeContainer = styled.div`
  margin-top: auto;
`;

function Home() {
  const { isAuthenticated } = useUser();

  const navigate = useNavigate();

  return (
    <>
      <NavigationHeader />

      <StyledDisplayOther>
        <WelcomIntro>
          <h1>Welcome you to TASK-IT</h1>

          <h3>The TASK that pay effortlessly</h3>

          <p>
            Join thousands of successful earners who make money daily through
            simple tasks and smart stock purchases. Start earning today!
          </p>
        </WelcomIntro>

        <ButtonContainer>
          {isAuthenticated ? (
            <GetStartedButton onClick={() => navigate("/app")}>
              Dashboard
            </GetStartedButton>
          ) : (
            <GetStartedButton onClick={() => navigate("/member/auth")}>
              Get Started Now
            </GetStartedButton>
          )}
          <DemoButton onClick={() => navigate("/faq")}>FAQ</DemoButton>
        </ButtonContainer>

        <MarqueeContainer>
          <LogoMarquee />
        </MarqueeContainer>
      </StyledDisplayOther>
    </>
  );
}

export default Home;
