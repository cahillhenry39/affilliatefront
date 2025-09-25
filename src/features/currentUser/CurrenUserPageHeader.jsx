import styled from "styled-components";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { useState } from "react";
import { formatCurrencyParts, formatTextCapitalize } from "../../utils/helpers";
import useUser from "../authentication/useUser";

const StyledContainer = styled.div`
  padding: 2rem 1rem 3rem;
  background: linear-gradient(135deg, var(--color-grey-0), #d0f0dc);

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NameAndAvatar = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  column-gap: 0.51rem;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
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

const CurrentStageTier = styled.p`
  font-size: 1.1rem;
  color: var(--color-grey-600);
  background-color: var(--color-grey-0);
  padding: 0.51rem 1rem;
  width: fit-content;
  border-radius: 9px;
`;

const ShieldSVG = styled(HiMiniShieldCheck)`
  width: 7rem;
  height: 7rem;
  color: orangered;

  position: absolute;
  top: 50%;
  right: 0rem;
  transform: translate(0, -50%);
`;

function CurrenUserPageHeader({ balance = 0, userPackageTitle, personalData }) {
  const { hideBalanceSettings } = useUser();
  const [showBalance, setShowBalance] = useState(!hideBalanceSettings);

  const { currency, amount } = formatCurrencyParts(balance);

  return (
    <StyledContainer>
      <NameAndAvatar>
        <ImageContainer>
          <img src={personalData?.avatar || "/main/badGuy.jpg"} />
        </ImageContainer>

        <p>
          Hello,{" "}
          {formatTextCapitalize(
            personalData?.fullName?.split(" ")?.slice(1)?.join(" ")
          )}
        </p>
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
            <SyomboleSpan>{currency}</SyomboleSpan>
            <CurrencyPara>{amount}</CurrencyPara>
          </ContentContainerCurrency>
        ) : (
          <CurrencyPara>xx xXx xx</CurrencyPara>
        )}

        <CurrentStageTier>{`Current Tier - ${formatTextCapitalize(
          userPackageTitle
        )}`}</CurrentStageTier>

        <ShieldSVG />
      </BalanceAndAccountContainer>
    </StyledContainer>
  );
}

export default CurrenUserPageHeader;
