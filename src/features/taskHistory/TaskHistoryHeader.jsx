import styled from "styled-components";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { formatCurrencyParts, formatTextCapitalize } from "../../utils/helpers";

const StyledContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem 1rem 1.3rem;
  margin-top: -3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BalanceAndAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  margin-top: 1rem;
  position: relative;
`;

const EachInnerContentCOntainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;
`;

const EyeSVGOff = styled(IoIosEyeOff)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-700);
`;

const EyeSVGOn = styled(IoIosEye)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-700);
`;

const ContentSpan = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-700);
`;

const ContentContainerCurrency = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SyomboleSpan = styled.span`
  font-size: 2rem;
  color: var(--color-grey-800);
`;

const CurrencyPara = styled.p`
  font-size: 3rem;
  color: var(--color-grey-900);
  font-weight: 600;
`;

const CurrentStageTier = styled.p`
  font-size: 1.1rem;
  color: var(--color-grey-0);
  background-color: var(--color-brand-700);
  padding: 0.51rem 1rem;
  width: fit-content;
  border-radius: 9px;

  position: absolute;
  top: 50%;
  right: 0rem;
  transform: translate(0, -50%);
`;

const SuccessSpan = styled.span`
  background-color: var(--color-grey-600);
  color: var(--color-grey-50);
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  font-size: 1.1rem;
`;

function TaskHistoryHeader({
  balanceTitle = "Total Claimed",
  balance = 34,
  packageName = "",
  otherMesage,
  isLoading,
}) {
  const [showBalance, setShowBalance] = useState(true);

  const { currency, amount } = formatCurrencyParts(balance);

  return (
    <StyledContainer>
      <BalanceAndAccountContainer>
        <EachInnerContentCOntainer>
          <ContentSpan>{formatTextCapitalize(balanceTitle)}</ContentSpan>

          {showBalance ? (
            <EyeSVGOn onClick={() => setShowBalance(false)} />
          ) : (
            <EyeSVGOff onClick={() => setShowBalance(true)} />
          )}
        </EachInnerContentCOntainer>

        {showBalance && !isLoading ? (
          <ContentContainerCurrency>
            <SyomboleSpan>{currency}</SyomboleSpan>
            <CurrencyPara>{amount}</CurrencyPara>
          </ContentContainerCurrency>
        ) : (
          <CurrencyPara>xx xXx xx</CurrencyPara>
        )}
        {otherMesage && !isLoading ? (
          <SuccessSpan>{otherMesage}</SuccessSpan>
        ) : (
          ""
        )}

        {!isLoading && (
          <CurrentStageTier>{`Current Tier - ${packageName}`}</CurrentStageTier>
        )}
      </BalanceAndAccountContainer>
    </StyledContainer>
  );
}

export default TaskHistoryHeader;
