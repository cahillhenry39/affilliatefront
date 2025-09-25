import styled, { css } from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CoinSVG from "../../ui/CoinSVG";

const StyledContainer = styled.div`
  padding: 1rem 1rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          background-color: var(--color-green-backColor);
        `
      : css`
          background-color: var(--color-green-backColors);
        `}
`;

const MarkettingTalkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 1rem;

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          color: var(--color-brand-100);
        `
      : css`
          color: var(--color-brand-800);
        `}
`;

const ExtimatedAmountEarn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          & h2 {
            font-size: 3rem;
            color: var(--color-brand-100);
          }
        `
      : css`
          & h2 {
            font-size: 3rem;
            color: var(--color-brand-800);
          }
          color: var(--color-brand-800);
        `}
`;

const UpToSpan = styled.span`
  font-size: 1rem;
  color: var(--color-brand-600);
  padding: 0.21rem 1rem;
  width: fit-content;
  border-radius: 9px;
  align-self: flex-start;
`;

const PerCustomerSpan = styled.span`
  font-size: 0.81rem;
  color: orangered;
  background-color: #ff440026;
  padding: 0.21rem 1rem;
  width: fit-content;
  border-radius: 9px;
  align-self: flex-end;
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

const FirstCoinBackgrcound = styled.div`
  position: absolute;
  top: 25%;
  left: 1rem;
`;

const SecondCoinBackgrcound = styled.div`
  position: absolute;
  top: 25%;
  right: 1rem;
  transform: rotate(80deg);
`;

function ReferralHeader({ highestReferralPaid, isDarkMode, isLoading }) {
  return (
    <StyledContainer $isDarkMode={isDarkMode?.toString()}>
      <MarkettingTalkContainer $isDarkMode={isDarkMode?.toString()}>
        <p>Invite friends to Taskiit</p>
        <p>to earn more</p>
      </MarkettingTalkContainer>

      <ExtimatedAmountEarn $isDarkMode={isDarkMode?.toString()}>
        <UpToSpan>Up to</UpToSpan>
        {isLoading ? (
          <h2>{formatCurrency(0)}</h2>
        ) : (
          <h2>{formatCurrency(highestReferralPaid)}</h2>
        )}
        <PerCustomerSpan>Per friend</PerCustomerSpan>
      </ExtimatedAmountEarn>

      <StyledAlerExplainContainer>
        You can invite as many as your friends to join Taskiit today for free to
        earn more.
      </StyledAlerExplainContainer>

      <FirstCoinBackgrcound>
        <CoinSVG
          width="7rem"
          color={"#eea51e32"}
          strokeColor={"#d38c09"}
          strokeWidth="1"
        />
      </FirstCoinBackgrcound>

      <SecondCoinBackgrcound>
        <CoinSVG
          width="7rem"
          // color={"var(--color-green-backColor)"}
          // strokeColor={"var(--color-brand-700)"}
          color={"#eea51e32"}
          strokeColor={"#d38c09"}
          strokeWidth="1"
        />
      </SecondCoinBackgrcound>
    </StyledContainer>
  );
}

export default ReferralHeader;
