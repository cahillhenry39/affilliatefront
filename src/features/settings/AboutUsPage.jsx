import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledContainer = styled.div``;

const StyledFormContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1rem 14rem;
  margin: 0rem 1rem;
  border-radius: 9px;
  background-color: var(--color-grey-0);

  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledFirstContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & h3 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-brand-800);
  }
`;

const ParaContent = styled.div`
  font-size: 1.4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const ParaContentUl = styled.ul`
  font-size: 1.4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;

  & li {
    list-style: decimal;
  }
`;

const BoldPara = styled.span`
  font-weight: 600;
`;

const ImageComponent = styled.div``;

const Image = styled.img`
  width: 26.4rem;
`;

const mainLogoDark = "/main/logomaindark.png";
const mainLogoLight = "/main/logomainlight.png";

function AboutUsPage() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? mainLogoDark : mainLogoLight;

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <ImageComponent to="/">
          <Image src={src} alt="Taskiit services Logo" />
        </ImageComponent>
        <StyledFirstContent>
          <h3>About TASK IT</h3>

          <ParaContent>
            At <BoldPara>Task It, </BoldPara> we believe productivity should not
            just be about getting things done — it should also be about creating
            meaningful progress in both personal and professional life.
            That&apos;s why we built Task It: a smart, user-friendly platform
            that brings together{" "}
            <BoldPara>
              task management, feedback, and stock purchase tools{" "}
            </BoldPara>{" "}
            in one seamless experience.
          </ParaContent>

          <ParaContent>
            We know that time is valuable, so we designed Task It to make
            organization simple, feedback effortless, and decision-making
            smarter. Whether you&apos;re managing your daily to-do list, rating
            your experience with an app or service, or exploring investment
            opportunities, Task It is here to help you stay focused and
            confident.
          </ParaContent>
        </StyledFirstContent>

        <StyledFirstContent>
          <h3>🌍 Our Vision</h3>

          <ParaContent>
            To become the most trusted productivity companion that empowers
            individuals and businesses worldwide to{" "}
            <BoldPara>
              {" "}
              accomplish more, make smarter choices, and grow sustainably.
            </BoldPara>
          </ParaContent>
        </StyledFirstContent>

        <StyledFirstContent>
          <h3>🎯 Our Mission</h3>

          <ParaContentUl>
            <li>
              To simplify productivity by providing intuitive task management
              and feedback tools.
            </li>

            <li>
              To bridge the gap between everyday tasks and long-term financial
              growth.
            </li>
            <li>
              To create an ecosystem where feedback fuels improvement and
              data-driven insights lead to smarter decisions.
            </li>
          </ParaContentUl>
        </StyledFirstContent>

        <StyledFirstContent>
          <h3>💡 Our Core Values</h3>

          <ParaContentUl>
            <li>
              <BoldPara>Simplicity </BoldPara>
              &mdash; We design with clarity, making complex tasks easy to
              manage.
            </li>

            <li>
              <BoldPara>Innovation </BoldPara>
              &mdash; We embrace technology to continuously improve how people
              organize, rate, and invest.
            </li>

            <li>
              <BoldPara>Trust </BoldPara>
              &mdash; Your tasks, feedback, and financial activities are safe,
              private, and transparent.
            </li>

            <li>
              <BoldPara>Growth </BoldPara>
              &mdash; We help you progress — whether it’s completing a task,
              building better services through feedback, or growing wealth
              through informed stock purchases.
            </li>

            <li>
              <BoldPara>Community </BoldPara>
              &mdash; We believe feedback is a two-way street and collaboration
              drives success.
            </li>

            <li>
              <BoldPara>Simplicity </BoldPara>
              &mdash; We design with clarity, making complex tasks easy to
              manage.
            </li>

            <li>
              <BoldPara>Simplicity </BoldPara>
              &mdash; We design with clarity, making complex tasks easy to
              manage.
            </li>
          </ParaContentUl>
        </StyledFirstContent>

        <StyledFirstContent>
          <ParaContent>
            At Task It, we&apos;re more than just a productivity tool —
            we&apos;re your partner in achieving goals, giving feedback that
            matters, and building a smarter future
          </ParaContent>
        </StyledFirstContent>
      </StyledFormContainerContainer>
    </StyledContainer>
  );
}

export default AboutUsPage;
