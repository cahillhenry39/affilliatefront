import useUser from "../../features/authentication/useUser";

import StockPageHeader from "../../features/vault/StockPageHeader";
import Sidebar from "../../ui/Sidebar";
import GreatStocksContainer from "../../features/vault/GreatStocksContainer";
import AllStocksContainer from "../../features/vault/AllStocksContainer";
import styled from "styled-components";
import { useGetAllStocks } from "../../features/vault/useVault";
import TaskLoader from "../../features/task/TaskLoader";

const StyledContainer = styled.div`
  overflow-y: scroll;
  height: 70vh;
  margin-top: -2rem;
  padding-top: 2rem;
  padding-bottom: 8rem;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

function Vault() {
  const { expenseBal, userPackageTitle, personalData } = useUser();
  const {
    isTopStocks,
    isModerate,
    isVeryRisky,
    totalActivePurchase,
    totalValue,
    isLoading,
  } = useGetAllStocks();

  return (
    <>
      <StockPageHeader
        expenseBal={expenseBal}
        userPackageTitle={userPackageTitle}
        personalData={personalData}
        totalActivePurchase={totalActivePurchase}
        totalValue={totalValue}
      />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <StyledContainer>
          <GreatStocksContainer isTopStocks={isTopStocks} />

          <AllStocksContainer stockData={isModerate} />
          <AllStocksContainer stockData={isVeryRisky} type={'High Stakes'}/>
        </StyledContainer>
      )}

      <Sidebar />
    </>
  );
}

export default Vault;
