import styled from "styled-components";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { formatCurrency, formatCurrencyParts } from "../../utils/helpers";
import { FiAirplay, FiPercent } from "react-icons/fi";
import ToggleButton from "../../ui/ToogleBotton";

const StyledContainer = styled.div`
  padding: 2rem 1rem 3rem;
  background: linear-gradient(135deg, var(--color-grey-0), #d0f0dc);

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NameAndAvatar = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  column-gap: 0.51rem;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;

  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const BalanceAndAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  margin-top: 2rem;
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

const ShieldSVG = styled(FiPercent)`
  width: 7rem;
  height: 7rem;
  color: var(--color-brand-700);

  position: absolute;
  top: 50%;
  right: 0rem;
  transform: translate(0, -50%);
`;

const EachContentSummary = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;

  & p {
    font-size: 1rem;
  }

  & span {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

function StockPageHeader({ expenseBal = 0, totalValue, totalActivePurchase }) {
  const [showBalance, setShowBalance] = useState(true);
  const [toggleCurrency, setToggleCurrency] = useState(false);

  const { currency, amount } = formatCurrencyParts(expenseBal);
  const { currency: usdCurrency, amount: usdAmount } = formatCurrencyParts(
    expenseBal / 1500,
    "USD"
  );

  return (
    <StyledContainer>
      <NameAndAvatar>
        <ImageContainer>
          <FiAirplay />
        </ImageContainer>
        <p>Stocks & ETFs</p>
      </NameAndAvatar>

      <BalanceAndAccountContainer>
        <EachInnerContentCOntainer>
          <ContentSpan>Total Balance</ContentSpan>

          {showBalance ? (
            <EyeSVGOn onClick={() => setShowBalance(false)} />
          ) : (
            <EyeSVGOff onClick={() => setShowBalance(true)} />
          )}
        </EachInnerContentCOntainer>

        {showBalance ? (
          <ContentContainerCurrency>
            {toggleCurrency ? (
              <>
                <SyomboleSpan>{currency}</SyomboleSpan>
                <CurrencyPara>{amount}</CurrencyPara>
              </>
            ) : (
              <>
                <SyomboleSpan>{usdCurrency}</SyomboleSpan>
                <CurrencyPara>{usdAmount}</CurrencyPara>
              </>
            )}
          </ContentContainerCurrency>
        ) : (
          <CurrencyPara>xx xXx xx</CurrencyPara>
        )}

        <ToggleButton
          currentState={toggleCurrency}
          onChange={setToggleCurrency}
        />

        {totalActivePurchase >= 1 ? (
          <ContentContainerCurrency>
            <EachContentSummary>
              <p>Total Purchase</p>
              <span>{totalActivePurchase}</span>
            </EachContentSummary>

            <EachContentSummary>
              <p>Total Value</p>
              <span>{formatCurrency(totalValue, "USD")}</span>
            </EachContentSummary>
          </ContentContainerCurrency>
        ) : (
          ""
        )}

        <ShieldSVG />
      </BalanceAndAccountContainer>
    </StyledContainer>
  );
}

export default StockPageHeader;
