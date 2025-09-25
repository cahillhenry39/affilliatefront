import styled, { css } from "styled-components";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleStock } from "../../features/vault/useVault";
import TaskLoader from "../../features/task/TaskLoader";
import SingleViewMainStock from "../../features/vault/SingleViewMainStock";
import { useGetCompanyDetails } from "../../services/useCompanyDetails";

const StyledContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;

  overflow: hidden;
`;

const OverviewHistoriesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;
  overflow: hidden;
  transition: all 0.3s;
  padding: 0rem 1rem;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          max-height: 100%;
          opacity: 1;
        `
      : css`
          max-height: 0;
          opacity: 0;
        `}
`;

const EachOverviewHistoriesContainer = styled.div`
  padding: 0.4rem 1.2rem;
  border-radius: 9px;
  cursor: pointer;
  font-size: 1.4rem;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          border: none;
          background-color: var(--color-brand-700);
          color: var(--color-brand-50);
        `
      : css`
          border: 1px solid var(--color-grey-10);
          background-color: var(--color-grey-0);
          color: var(--color-grey-500);
        `}
`;

///

function SingleVault() {
  const { id } = useParams();
  const { singleStock, isLoading, purchaseStock } = useFetchSingleStock(id);
  const { getCompanuDetails, isFetchingDetails } = useGetCompanyDetails();

  const [showPage, setShowPage] = useState("main");
  const navigate = useNavigate();

  function handleNavigate() {
    if (showPage === "main") {
      navigate(-1);
    }

    setShowPage("main");
  }

  return (
    <>
      <HeaderNavigationBack
        text={
          showPage === "main"
            ? "Stock"
            : showPage === "purchase"
            ? "Purchase Stock"
            : "View Histories"
        }
        handleNavigate={handleNavigate}
        isNavigattion
      />

      <OverviewHistoriesContainer
        $isActive={(showPage !== "purchase")?.toString()}
      >
        <EachOverviewHistoriesContainer
          $isActive={(showPage === "main")?.toString()}
          onClick={() => setShowPage("main")}
        >
          Overview
        </EachOverviewHistoriesContainer>
        <EachOverviewHistoriesContainer
          $isActive={(showPage === "histories")?.toString()}
          onClick={() => setShowPage("histories")}
        >
          Histories
        </EachOverviewHistoriesContainer>
      </OverviewHistoriesContainer>

      <StyledContainer>
        {isLoading || isFetchingDetails ? (
          <TaskLoader />
        ) : (
          <SingleViewMainStock
            showPage={showPage}
            setShowPage={setShowPage}
            navigate={navigate}
            singleStock={singleStock}
            getCompanuDetails={getCompanuDetails}
            purchaseStock={purchaseStock}
          />
        )}
      </StyledContainer>
    </>
  );
}

export default SingleVault;
