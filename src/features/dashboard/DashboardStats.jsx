import { HiMiniShieldCheck, HiOutlineChevronRight } from "react-icons/hi2";

import { formatCurrency, formatTextCapitalize } from "../../utils/helpers";
import styled from "styled-components";
import { device } from "../../../mediaQuery";
import useUser from "../authentication/useUser";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-brand-700);
  padding: 1rem 1rem;
  border-radius: 9px;

  @media ${device.mobileL} {
    gap: 0.7rem;
  }

  @media ${device.mobileS} {
    gap: 0.2rem;
  }
`;

const WelcomeContent = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-0);
  font-weight: 600;
  margin-bottom: -1rem;
  margin-left: 0.5rem;
`;

const EachContentCOntainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EachInnerContentCOntainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;
`;

const EyeSVGOff = styled(IoIosEyeOff)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-50);
`;

const EyeSVGOn = styled(IoIosEye)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-50);
`;

const ShieldSVG = styled(HiMiniShieldCheck)`
  width: 2rem;
  height: 2rem;
  color: orangered;
`;

const ContentSpan = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-50);
`;

const CurrencyPara = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey-0);
  font-weight: 600;
`;

const CurrencyHidePara = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-0);
  font-weight: 600;
`;

const TotalAmountEarnedContainerr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0rem;

  background-color: var(--color-grey-0);
  border-radius: 11px;
  padding: 0.3rem 2rem;
  min-width: 15rem;

  & p {
    font-size: 1.8rem;
    color: var(--color-brand-700);
    font-weight: 600;
    margin-bottom: -0.41rem;
  }

  & span {
    font-size: 1rem;
    color: var(--color-grey-600);
  }
`;

const HistoryContainerr = styled(Link)`
  align-self: flex-end;

  display: flex;
  align-items: flex-end;
  gap: 0rem;
  color: var(--color-grey-50);

  & p {
    font-size: 1.8rem;
    color: var(--color-brand-700);
    font-weight: 600;
    margin-bottom: -0.41rem;
  }

  & span {
    font-size: 1.2rem;
  }
`;

function DashboardStats() {
  const {
    balance,
    expenseBal,
    fullName,
    hideExpenseSettings,
    hideBalanceSettings,
    isLoading,
  } = useUser();
  const [showBalance, setShowBalance] = useState(!hideBalanceSettings);
  const [showExpensesBal, setShowExpensesBal] = useState(!hideExpenseSettings);

  return (
    <StyledStats>
      <WelcomeContent>{`Hi, ${
        fullName ? formatTextCapitalize(fullName?.split(" ")?.[0]) : "User"
      }`}</WelcomeContent>
      <EachContentCOntainer>
        <EachInnerContentCOntainer>
          <ShieldSVG />
          <ContentSpan>Available Balance</ContentSpan>

          {showBalance ? (
            <EyeSVGOff
              onClick={() => {
                setShowBalance(false);
                setShowExpensesBal(false);
              }}
            />
          ) : (
            <EyeSVGOn
              onClick={() => {
                setShowBalance(true);
                setShowExpensesBal(true);
              }}
            />
          )}
        </EachInnerContentCOntainer>

        {showBalance ? (
          <CurrencyPara>{formatCurrency(balance)}</CurrencyPara>
        ) : (
          <CurrencyHidePara>XX XXX XX</CurrencyHidePara>
        )}
      </EachContentCOntainer>

      <EachContentCOntainer>
        <TotalAmountEarnedContainerr>
          {isLoading ? (
            <CurrencyHidePara>XX XXX XX</CurrencyHidePara>
          ) : showExpensesBal ? (
            <p>{formatCurrency(expenseBal)}</p>
          ) : (
            <CurrencyHidePara>XX XXX XX</CurrencyHidePara>
          )}
          <span>Expense Balance</span>
        </TotalAmountEarnedContainerr>

        <HistoryContainerr to={"/app/finance"}>
          <span>History</span>
          <HiOutlineChevronRight />
        </HistoryContainerr>
      </EachContentCOntainer>
    </StyledStats>
  );
}

export default DashboardStats;
