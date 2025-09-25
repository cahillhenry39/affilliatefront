import styled from "styled-components";
import {
  FiUser,
  FiLock,
  FiKey,
  FiDribbble,
  FiShuffle,
  FiHome,
  FiSun,
  FiMessageSquare,
  FiInfo,
  FiTwitch,
} from "react-icons/fi";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import SettingsEachNavigation from "./SettingsEachNavigation";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: -3rem 1rem 1rem;

  padding: 3rem 0rem 4rem;
  height: 95vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledEachSettingsNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--color-grey-0);
  padding: 2.4rem 1rem;
  border-radius: 9px;
`;

function MainSettingsNavigation({ handleGoToPage }) {
  return (
    <>
      <HeaderNavigationBack text={"Settings"} />

      <StyledContainer>
        <StyledEachSettingsNavigation>
          <SettingsEachNavigation
            icon={<FiUser />}
            title={"Personal Settings"}
            link={"personal"}
            handleGoToPage={handleGoToPage}
          />

          {/* <SettingsEachNavigation
            icon={<FiUser />}
            title={"Image Settings"}
            link={"caption"}
            handleGoToPage={handleGoToPage}
          /> */}

          <SettingsEachNavigation
            icon={<FiLock />}
            title={"Transaction Settings"}
            link={"transaction"}
            handleGoToPage={handleGoToPage}
          />

          <SettingsEachNavigation
            icon={<FiKey />}
            title={"Login Settings"}
            link={"login"}
            handleGoToPage={handleGoToPage}
          />
        </StyledEachSettingsNavigation>

        <StyledEachSettingsNavigation>
          <SettingsEachNavigation
            icon={<FiShuffle />}
            title={"Stock Settings"}
            link={"stock"}
            handleGoToPage={handleGoToPage}
          />

          <SettingsEachNavigation
            icon={<FiDribbble />}
            title={"Withdrawal Settings"}
            link={"withdrawal"}
            handleGoToPage={handleGoToPage}
          />
        </StyledEachSettingsNavigation>

        <StyledEachSettingsNavigation>
          <SettingsEachNavigation
            icon={<FiHome />}
            title={"Homepage Settings"}
            link={"homepage"}
            handleGoToPage={handleGoToPage}
          />

          <SettingsEachNavigation
            icon={<FiSun />}
            title={"Themes"}
            link={"themes"}
            handleGoToPage={handleGoToPage}
          />

          <SettingsEachNavigation
            icon={<FiMessageSquare />}
            title={"Subscription Settings"}
            link={"subscription"}
            handleGoToPage={handleGoToPage}
          />

          <SettingsEachNavigation
            icon={<FiInfo />}
            title={"About"}
            link={"about"}
            handleGoToPage={handleGoToPage}
          />
        </StyledEachSettingsNavigation>

        <StyledEachSettingsNavigation>
          <SettingsEachNavigation
            icon={<FiTwitch />}
            title={"Feedback and Suggestion"}
            link={"feedback"}
            handleGoToPage={handleGoToPage}
          />
        </StyledEachSettingsNavigation>
      </StyledContainer>
    </>
  );
}

export default MainSettingsNavigation;
