import styled, { css } from "styled-components";
import ReferralHeader from "../../features/referral/ReferralHeader";
import { useState } from "react";
import ReferralRulesModal from "../../features/referral/ReferralRulesModal";
import ReferralContentContainer from "../../features/referral/ReferralContentContainer";
import MyReferrals from "../../features/referral/MyReferrals";
import ReferralNavHeader from "../../features/referral/ReferralNavHeader";
import { useGetMyReferralDetails } from "../../features/referral/useReferral";
import SocialMediaShare from "../../ui/SocialMediaShare";
import { useDarkMode } from "../../context/DarkModeContext";
import TaskLoader from "../../features/task/TaskLoader";

const StyledContainerOnly = styled.div``;

const StyledContainerContent = styled.div`
  position: relative;
  padding-top: 4rem;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const ReferralShareLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  padding: 2rem;
  gap: 1rem;
  margin: 2rem 1rem 2rem;

  text-align: center;

  & button {
    color: inherit;
    background-color: transparent;
    border: 1px solid var(--color-brand-700);
    padding: 1rem 3rem;
    font-size: 1.4rem;
    border-radius: 11px;
  }

  & p {
    font-size: 1.3rem;
  }

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          background-color: var(--color-green-backColor);
          color: var(--color-brand-100);
        `
      : css`
          background-color: var(--color-green-backColors);
          color: var(--color-brand-800);
        `}
`;

function ReferralPage() {
  const [showRules, setShowRules] = useState(false);
  const [openShare, setOpendShare] = useState(false);

  const { isDarkMode } = useDarkMode();

  const {
    highestReferralPaid,
    referralDetails,
    allMyReferrals,
    totalClaimed,
    totalNotClaimed,
    isLoading,
  } = useGetMyReferralDetails();

  return (
    <StyledContainerOnly>
      <ReferralNavHeader setShowRules={setShowRules} isDarkMode={isDarkMode} />

      <StyledContainerContent>
        <ReferralHeader
          showRules={showRules}
          setShowRules={setShowRules}
          highestReferralPaid={highestReferralPaid}
          isDarkMode={isDarkMode}
          isLoading={isLoading}
        />

        {isLoading ? (
          <TaskLoader />
        ) : (
          <>
            <ReferralContentContainer
              referralUrl={referralDetails?.referralUrl}
              isDarkMode={isDarkMode}
            />

            <MyReferrals
              allMyReferrals={allMyReferrals}
              totalClaimed={totalClaimed}
              totalNotClaimed={totalNotClaimed}
              isDarkMode={isDarkMode}
            />

            <ReferralShareLinks $isDarkMode={isDarkMode?.toString()}>
              {!openShare ? (
                <button type="secondary" onClick={() => setOpendShare(true)}>
                  share with your friends
                </button>
              ) : (
                <>
                  <p>Share across multiple channels</p>
                  <SocialMediaShare
                    url={`https://taskiit.com/${referralDetails?.referralUrl}`}
                    isDarkMode={isDarkMode}
                  />
                </>
              )}
            </ReferralShareLinks>
          </>
        )}
      </StyledContainerContent>

      <ReferralRulesModal
        showMini={showRules}
        setShowMini={() => setShowRules(false)}
        setShowRules={setShowRules}
      />
    </StyledContainerOnly>
  );
}

export default ReferralPage;
