import styled from "styled-components";
import SingleStockOverview from "./SingleStockOverview";
import PurchaseSTockForm from "./PurchaseSTockForm";
import StockHistoriesContainer from "./StockHistories";

const StyledSingleVault = styled.div`
  position: absolute;
  height: 100vh;
  /* width: 100vw; */
  overflow: hidden;

  width: calc(100% - 2rem); /* 👈 full width minus gutters */
  margin: 0rem 1rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.3s;
`;

const StyledSecondMainSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: absolute;
  height: 100vh;
  width: calc(100% - 2rem);
  margin: 0rem 1rem;
  padding-bottom: 11rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.3s;
`;

const StyledHistories = styled.div`
  position: absolute;
  height: 100vh;
  width: calc(100% - 2rem); /* 👈 full width minus gutters */
  overflow: hidden;
  margin: 0rem 1rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }

  transform: translateX(${({ $position }) => $position}%);
  transition: all 0.3s;
  margin: 0rem 1rem;
`;

function SingleViewMainStock({
  showPage,
  setShowPage,
  navigate,
  singleStock,
  getCompanuDetails,
  purchaseStock,
}) {
  return (
    <>
      <StyledSingleVault $position={showPage === "main" ? "0" : "-110"}>
        <SingleStockOverview
          setShowPage={setShowPage}
          singleStock={singleStock}
        />
      </StyledSingleVault>

      <StyledSecondMainSlider $position={showPage === "purchase" ? "0" : "200"}>
        <PurchaseSTockForm
          setShowPage={setShowPage}
          singleStock={singleStock}
          getCompanuDetails={getCompanuDetails}
        />
      </StyledSecondMainSlider>

      <StyledHistories $position={showPage === "histories" ? "0" : "200"}>
        <StockHistoriesContainer
          navigate={navigate}
          singleStock={singleStock}
          purchaseStock={purchaseStock}
        />
      </StyledHistories>
    </>
  );
}

export default SingleViewMainStock;
