import styled, { css, keyframes } from "styled-components";
import { Sparkles, Gift, Users, Wallet, CircleDollarSign } from "lucide-react";

import { formatCurrency } from "../../utils/helpers";

const float = keyframes`
0%{
transform:translateY(0px) rotate(0deg);
}
50%{
transform:translateY(-12px) rotate(6deg);
}
100%{
transform:translateY(0px) rotate(0deg);
}
`;

const pulse = keyframes`
0%,100%{
opacity:.4;
transform:scale(1);
}
50%{
opacity:1;
transform:scale(1.12);
}
`;

const Overlay = styled.div`
  background-color: #191919;
`;

const StyledContainer = styled.div`
  padding: 1rem 1rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;

  background: #0bb7832b;
`;

const Glow = styled.div`
  position: absolute;

  width: 24rem;
  height: 24rem;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0) 70%
  );

  top: -10rem;
  right: -8rem;

  pointer-events: none;
`;

const GlowTwo = styled(Glow)`
  top: auto;
  bottom: -12rem;
  left: -8rem;
`;

const DecorativeIcon = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.18);

  animation: ${float} 6s ease-in-out infinite;

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const SparkleOne = styled(DecorativeIcon)`
  top: 18px;
  left: 22px;
  animation-duration: 7s;
`;

const SparkleTwo = styled(DecorativeIcon)`
  top: 26px;
  right: 28px;
  animation-duration: 9s;
`;

const GiftIcon = styled(DecorativeIcon)`
  bottom: 10rem;
  left: 30px;
  animation-duration: 8s;
`;

const WalletIcon = styled(DecorativeIcon)`
  bottom: 10rem;
  right: 30px;
  animation-duration: 10s;
`;

const DollarIcon = styled(DecorativeIcon)`
  top: 30%;
  right: 50%;
  animation-duration: 11s;
`;

const RewardCard = styled.div`
  width: fit-content;

  margin: auto;

  padding: 1.4rem 2.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 18px;

  backdrop-filter: blur(20px);

  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255, 255, 255, 0.18);

  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);

  z-index: 5;

  span {
    font-size: 1rem;
    opacity: 0.85;
    color: white;
  }

  h2 {
    font-size: 3.3rem;
    color: white;
    margin: 0.5rem 0;
  }

  small {
    background: #ffffff20;
    padding: 0.35rem 1rem;
    border-radius: 30px;
    color: white;
  }
`;

const WeeklyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: fit-content;

  margin: auto;

  padding: 0.45rem 1rem;

  border-radius: 999px;

  background: #ffffff18;

  color: white;

  font-size: 0.95rem;

  svg {
    animation: ${pulse} 2s infinite;
  }
`;

const MarkettingTalkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 1rem;

  text-align: center;

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          color: var(--color-brand-100);
        `
      : css`
          color: var(--color-brand-800);
        `}
`;

const StyledAlerExplainContainer = styled.span`
  font-size: 1rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-0);
  text-align: center;
  padding: 0.51rem 1rem;
  border-radius: 11px;
  margin: 0rem 2rem;
`;

function ReferralProgramHeader({ highestReferralPaid, isDarkMode, isLoading }) {
  return (
    <>
      <Overlay>
        <StyledContainer $isDarkMode={isDarkMode?.toString()}>
          <>
            <Glow />
            <GlowTwo />

            <SparkleOne>
              <Sparkles />
            </SparkleOne>

            <SparkleTwo>
              <Sparkles />
            </SparkleTwo>

            <GiftIcon>
              <Gift />
            </GiftIcon>

            <WalletIcon>
              <Wallet />
            </WalletIcon>

            <DollarIcon>
              <CircleDollarSign />
            </DollarIcon>

            <WeeklyBadge>
              <Sparkles size={16} />
              Weekly Referral Program
            </WeeklyBadge>

            <MarkettingTalkContainer $isDarkMode={isDarkMode?.toString()}>
              <p>Referral Rewards Program</p>
              <p>Earn Gifts Every Week</p>
            </MarkettingTalkContainer>

            <RewardCard>
              <span>Earn up to</span>

              {isLoading ? (
                <h2>{formatCurrency(0)}</h2>
              ) : (
                <h2>{formatCurrency(3000000)}</h2>
              )}

              <small
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Worth of Gifts and Cash
              </small>
            </RewardCard>

            <StyledAlerExplainContainer>
              Invite people to Taskiit and earn rewards whenever they sign up
              and subscribe to any package within the week. There is no limit to
              how much points you can earn.
            </StyledAlerExplainContainer>
          </>
        </StyledContainer>
      </Overlay>
    </>
  );
}

export default ReferralProgramHeader;
