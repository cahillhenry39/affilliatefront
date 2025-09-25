import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../utils/helpers";
import SpinnerAndText from "./SpinnerAndText";

const ButtonWrapper = styled.div`
  position: relative;
  height: 4rem;
  background-color: var(--color-grey-10);

  width: 90%; /* Your desired width */
`;

const ProgressFill = styled.div`
  position: absolute;
  height: 100%;
  width: ${({ $progress }) => ($progress >= 100 ? 100 : $progress)}%;
  background-color: ${({ $progress, $claimed }) =>
    $progress < 100
      ? "var(--color-grey-300)"
      : $claimed === "true"
      ? "var(--color-grey-200)"
      : "var(--color-brand-700)"};
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;

  border-bottom-right-radius: ${({ $progress }) =>
    $progress < 100 ? "0px" : "9px"};

  border-top-right-radius: ${({ $progress }) =>
    $progress < 100 ? "0px" : "9px"};

  transition: width 0.5s ease-in-out;
  z-index: 0;
`;

const StyledClaimButton = styled.button`
  position: absolute;

  width: 100%;
  height: 100%;
  border: ${({ $progress }) =>
    $progress < 100 ? "1px solid var(--color-grey-100)" : "none"};
  border-radius: 9px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#fff" : "#666")};
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  z-index: 1;
  background-color: transparent;
`;

function ClaimRewardActionButton({
  totalTask = 3,
  totalDone = 0,
  handleSubmit = () => {},
  totalAmountNotClaimed,
  claimed = true,
  isWorking,
}) {
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         return 100;
  //       }
  //       return prev + 10;
  //     });
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    setProgress(Math.round((totalDone / totalTask) * 100));
  }, [setProgress, totalDone, totalTask]);

  return (
    <ButtonWrapper>
      <ProgressFill $progress={progress} $claimed={claimed?.toString()} />
      <StyledClaimButton
        onClick={handleSubmit}
        $progress={progress}
        $active={progress === 100 && !claimed}
        disabled={progress < 100 || claimed}
      >
        {isWorking ? (
          <SpinnerAndText message={"Claiming"} />
        ) : claimed ? (
          `You Claimed  ${formatCurrency(totalAmountNotClaimed)}`
        ) : progress === 100 ? (
          `🎁 Claim ${formatCurrency(totalAmountNotClaimed)}`
        ) : (
          `⏳ ${progress > 100 ? 100 : progress}% Progress - ${formatCurrency(
            totalAmountNotClaimed
          )}`
        )}
      </StyledClaimButton>
    </ButtonWrapper>
  );
}

export default ClaimRewardActionButton;
