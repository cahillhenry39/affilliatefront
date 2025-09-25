import styled from "styled-components";
import NavigationHeader from "../../features/Home/NavigationHeader";
import {
  Award,
  BookOpenCheck,
  ChartSpline,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import EachCard from "../../features/aboutus/EachCard";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  /* height: calc(var(--real-vh, 1vh) * 100); */
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  padding-top: 6rem;
  padding-bottom: 5rem;

  background-color: var(--color-grey-10);

  display: flex;
  flex-direction: column;
`;

const WelcomIntro = styled.div`
  & h2 {
    font-size: 3rem;
    text-align: center;
    & span {
      color: var(--color-brand-700);
    }
  }

  & p {
    font-size: 1.4rem;
    padding: 0 2rem;
    text-align: center;
    color: var(--color-grey-600);
    hyphens: none;
    -webkit-hyphens: none;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const SecondHeaderContainer = styled.div`
  margin-top: 2rem;
  & h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
    & span {
      color: var(--color-brand-700);
    }
  }

  & p {
    font-size: 1.4rem;
    padding: 0 2rem;
    color: var(--color-grey-600);
    hyphens: none;
    -webkit-hyphens: none;
  }
`;

function AboutUsPublic() {
  return (
    <>
      <NavigationHeader />
      <StyledDisplayOther>
        <WelcomIntro>
          <h2>
            Your Trust is Our <span>Priority</span>
          </h2>

          <p>
            We are the leading platform for earning money through app ratings
            and smart stock investments. Join thousands of successful earners
            today.
          </p>
        </WelcomIntro>

        <StepsContainer>
          <EachCard
            icon={<ShieldCheck />}
            header={"Bank-Level "}
            spanHeader={"Security"}
            message={
              "Your data and funds are protected with 256-bit SSL encryption, multi-factor authentication, and regular security audits."
            }
          />

          <EachCard
            icon={<Award />}
            header={"Fully "}
            spanHeader={"Licensed"}
            message={
              "We operate under proper business licenses and maintain compliance with all relevant financial regulations and data protection laws."
            }
          />

          <EachCard
            icon={<UsersRound />}
            header={"People First "}
            message={
              "Every decision we make puts our users' success and well-being at the center."
            }
          />

          <EachCard
            icon={<BookOpenCheck />}
            header={"Trust & "}
            spanHeader={"Transparency"}
            message={
              "We believe in complete transparency about earnings, fees, and how our platform works."
            }
          />

          <EachCard
            icon={<ChartSpline />}
            header={"Continuous "}
            spanHeader={"Innovation"}
            message={
              "We constantly improve our platform to create better earning opportunities for our users."
            }
          />
        </StepsContainer>

        <SecondHeaderContainer>
          <h2>
            Building the Future of <span>Digital Earning</span>
          </h2>

          <p>
            TASKIIT was born from a simple observation: traditional employment
            doesn&apos;t work for everyone. Whether you&apos;re a student,
            stay-at-home parent, retiree, or someone between jobs, you deserve
            access to flexible, legitimate earning opportunities. Our founders,
            having worked in top-tier financial institutions, saw how technology
            could bridge the gap between everyday people and earning
            opportunities typically reserved for financial professionals. We
            combined the accessibility of task-based work with the growth
            potential of smart investing. Today, TASKIIT is proud to be a
            trusted platform where anyone can start earning within hours of
            signing up. We&apos;ve paid out over $2.5 million to our users and
            maintain a 98% satisfaction rate because we put our community first.
          </p>
        </SecondHeaderContainer>
      </StyledDisplayOther>
    </>
  );
}

export default AboutUsPublic;
