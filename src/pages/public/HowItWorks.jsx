import styled from "styled-components";
import NavigationHeader from "../../features/Home/NavigationHeader";
import EachHowItWorkCard from "../../features/howitwork/EachHowItWorkCard";
import { Activity, Banknote, Smartphone, Star } from "lucide-react";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  /* height: calc(var(--real-vh, 1vh) * 100); */
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

function HowItWorks() {
  return (
    <>
      <NavigationHeader />
      <StyledDisplayOther>
        <WelcomIntro>
          <h2>
            How It <span>Works</span>
          </h2>

          <p>
            Start earning in 4 simple steps. Our platform makes it easy to
            generate income through verified tasks and smart stock purchases.
          </p>
        </WelcomIntro>

        <StepsContainer>
          <EachHowItWorkCard
            number={1}
            icon={<Smartphone />}
            header={"Sign Up & "}
            spanHeader={"Verify"}
            message={
              "Create your account in under 2 minutes. Quick verification process to ensure platform security."
            }
          />

          <EachHowItWorkCard
            number={2}
            icon={<Star />}
            header={"Rate Apps & "}
            spanHeader={"Complete Tasks"}
            message={
              "Browse available apps and give honest ratings. Complete simple tasks that take just minutes."
            }
          />

          <EachHowItWorkCard
            number={3}
            icon={<Activity />}
            header={"Invest in "}
            spanHeader={"Stocks"}
            message={
              "Use our advanced platform to buy and sell stocks. Get expert recommendations and market insights."
            }
          />

          <EachHowItWorkCard
            number={4}
            icon={<Banknote />}
            header={"Earn & "}
            spanHeader={"Withdraw"}
            message={
              "Watch your earnings grow daily. Get instant airtime recharge to your registered phone number, plus instant withdrawals to your preferred payment method."
            }
          />
        </StepsContainer>
      </StyledDisplayOther>
    </>
  );
}

export default HowItWorks;
