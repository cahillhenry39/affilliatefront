import styled from "styled-components";
import MainBankEditPage from "../../features/bankDetailsEdit/MainBankEditPage";
import { useGetAllAvailableBank } from "../../features/depositType/useDepositType";
import { useState } from "react";
import AllBanksAvailable from "../../features/bankDetailsEdit/AllBanksAvailable";

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
  transition: all 0.3s;
`;

const StyledSelectBankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: absolute;
  width: 100vw;

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.3s;
`;

function BankDetailsEditAddPage() {
  const { allAvailableBank, isFetchingBank } = useGetAllAvailableBank();
  const [showPage, setShowPage] = useState("main");
  const [bankSelected, setBankSelected] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  function handleSetSelectedBank(bankData) {
    setBankSelected(bankData);
    setShowPage("main");
  }

  return (
    <StyledContainer>
      <StyledBankAccountContainer
        $position={showPage === "main" ? "0" : "-100"}
      >
        <MainBankEditPage
          handleNavigateToBank={setShowPage}
          bankSelected={bankSelected}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          isLoading={isFetchingBank}
          allAvailableBank={allAvailableBank}
        />
      </StyledBankAccountContainer>

      <StyledSelectBankContainer $position={showPage === "main" ? "100" : "0"}>
        <AllBanksAvailable
          handleNavigateToBank={setShowPage}
          allAvailableBank={allAvailableBank}
          handleSetSelectedBank={handleSetSelectedBank}
        />
      </StyledSelectBankContainer>
    </StyledContainer>
  );
}

export default BankDetailsEditAddPage;
