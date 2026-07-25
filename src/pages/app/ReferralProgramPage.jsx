import styled from "styled-components";
import ReferralProgramHeader from "../../features/referral/referralProgramHeader";
import { useDarkMode } from "../../context/DarkModeContext";
import ReferralProgramNavHeader from "../../features/referral/ReferralProgramNavHeader";
import ReferralLeaderBoard from "../../features/referral/ReferralLeaderBoard";
import ReferralRewardsCatalog from "../../features/referral/ReferralRewardsCatalog";
import ReferralPointTable from "../../features/referral/ReferralPointTable";
import ReferralHistoryMaquee from "../../features/referral/ReferralHistoryMaquee";
import { useGetReferralLeaderboard } from "../../features/referral/useReferral";

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

const MarqueeContainer = styled.div`
  margin-top: auto;
  padding: 2rem 0rem;
`;

function ReferralProgramPage() {
  const {
    competiion,
    currentWeekLeaders,
    packages,
    pastRewards,
    lastWeekLeaders,
    rewardsCatalog,
    isLoading,
  } = useGetReferralLeaderboard();

  return (
    <StyledContainerOnly>
      <ReferralProgramNavHeader isDarkMode />

      <StyledContainerContent>
        <ReferralProgramHeader isDarkMode />

        {isLoading ? (
          <TaskLoader />
        ) : (
          <>
            <MarqueeContainer>
              <ReferralHistoryMaquee pastRewards={pastRewards} />
            </MarqueeContainer>

            <ReferralLeaderBoard leaderBoardData={currentWeekLeaders} />

            <ReferralRewardsCatalog rewardsCatalog={rewardsCatalog} />

            <ReferralPointTable packages={packages} />

            <ReferralLeaderBoard
              leaderBoardData={lastWeekLeaders}
              type={"past"}
            />
          </>
        )}
      </StyledContainerContent>
    </StyledContainerOnly>
  );
}

export default ReferralProgramPage;
