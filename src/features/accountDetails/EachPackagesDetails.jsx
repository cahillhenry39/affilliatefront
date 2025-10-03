import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import LevelBadgeSecond from "../../ui/LevelBadgeSecond";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

const StyledPackageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--color-grey-0);
  padding: 1rem 1rem 0rem;
  border-radius: 9px;
`;

const StyledContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledImageAndTextContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
`;

const ParaAndTitlt = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & p {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const CurrentPositionSpan = styled.span`
  background-color: ${({ $backColor }) =>
    $backColor || "var(--color-brand-100)"};
  color: var(--color-grey-50);
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  font-size: 1rem;
`;

const StyledContainerContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: hidden;
  transition: all 0.3s;

  ${(props) =>
    props?.$showPackage === "true"
      ? css`
          max-height: 30rem;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          border-top: 1px solid var(--color-grey-50);
        `
      : css`
          max-height: 0;
          padding-top: 0;
        `}

  & button {
    background-color: var(--color-green-backColor);
    /* background-color: var(--color-brand-700); */
    border: none;
    padding: 1rem 3rem;
    margin-top: 1rem;
    border-radius: 11px;
    color: var(--color-brand-700);
    font-weight: 600;

    &:disabled {
      color: var(--color-brand-500);
    }
  }
`;

const StyledContainerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  & p {
    font-size: 1.4rem;
    color: var(--color-grey-800);
  }

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-400);
  }
`;

const levelColors = [
  "#9e9e9e", // Level 1 - Grey
  "#607d8b", // Level 2 - Blue Grey
  "#2196f3", // Level 3 - Blue
  "#3f51b5", // Level 4 - Indigo
  "#00bcd4", // Level 5 - Cyan
  "#4caf50", // Level 6 - Green
  "#ff9800", // Level 7 - Orange
  "#f44336", // Level 8 - Red
];

function EachPackagesDetails({
  currentLevel,
  isHigher,
  isCurrent,
  totalDailyTask,
  cost,
  referralBonus,
  eachTaskEarns,
  handleSubscribePackage,
  isWorking,
  packageId,

  isCurrentPackage,
}) {
  const [showPackage, setShowPackage] = useState(isHigher);

  console.log(packageId, isCurrentPackage);

  return (
    <StyledPackageContainer>
      <StyledContainerHeader>
        <StyledImageAndTextContainer>
          <LevelBadgeSecond
            width={2.5}
            level={currentLevel}
            levelColors={levelColors}
          />

          <ParaAndTitlt>
            <p>{`Tier ${currentLevel}`}</p>

            {isCurrent ? (
              <CurrentPositionSpan $backColor={levelColors[currentLevel]}>
                Current
              </CurrentPositionSpan>
            ) : (
              ""
            )}
          </ParaAndTitlt>
        </StyledImageAndTextContainer>

        {showPackage ? (
          <IoIosArrowDown onClick={() => setShowPackage(false)} />
        ) : (
          <IoIosArrowUp onClick={() => setShowPackage(true)} />
        )}
      </StyledContainerHeader>

      <StyledContainerContentBody $showPackage={showPackage?.toString()}>
        <StyledContainerContent>
          <span>Daily task limits</span>
          <p>{totalDailyTask}</p>
        </StyledContainerContent>

        <StyledContainerContent>
          <span>Aprx Daily Earnings</span>
          <p>{formatCurrency(eachTaskEarns * totalDailyTask)}</p>
        </StyledContainerContent>

        <StyledContainerContent>
          <span>Referral Returns</span>
          <p>{formatCurrency(referralBonus)}</p>
        </StyledContainerContent>

        <StyledContainerContent>
          <span>Subscription Cost</span>
          <p>{formatCurrency(cost)}</p>
        </StyledContainerContent>

        {isHigher ? (
          <button
            onClick={() => {
              handleSubscribePackage(packageId);
            }}
            disabled={isWorking}
          >
            {isWorking && packageId === isCurrentPackage
              ? "Subscribing.."
              : `Subscribe`}
          </button>
        ) : (
          ""
        )}
      </StyledContainerContentBody>
    </StyledPackageContainer>
  );
}

export default EachPackagesDetails;
