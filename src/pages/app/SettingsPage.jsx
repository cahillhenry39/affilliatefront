import styled from "styled-components";

import MainSettingsLayout from "../../features/settings/MainSettingsLayout";
import MainSettingsNavigation from "../../features/settings/MainSettingsNavigation";
import { useSearchParams } from "react-router-dom";

const StyledContainer = styled.div`
  position: relative;
  height: 100vh;

  overflow: hidden;
`;

const StyledBankAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: absolute;
  width: 100vw;

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.4s;
`;

const StyledSelectBankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: absolute;
  width: 100vw;

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.4s;
`;

function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from search params, or default to "main"
  const showPage = searchParams.get("page") || "main";

  function handleGoToPage(page) {
    setSearchParams({ page }); // updates ?page=xxx
  }

  function handleReturnMainPage() {
    console.log(showPage);

    setSearchParams({ page: "main" }); // resets to ?page=main
  }

  return (
    <StyledContainer>
      <StyledBankAccountContainer
        $position={showPage === "main" ? "0" : "-100"}
      >
        <MainSettingsNavigation
          handleGoToPage={handleGoToPage}
          showPage={showPage}
        />
      </StyledBankAccountContainer>

      <StyledSelectBankContainer $position={showPage === "main" ? "100" : "0"}>
        <MainSettingsLayout
          handleReturnMainPage={handleReturnMainPage}
          showPage={showPage}
        />
      </StyledSelectBankContainer>
    </StyledContainer>
  );
}

export default SettingsPage;
