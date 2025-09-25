import styled from "styled-components";
import {
  formatCurrency,
  formatDate2,
  formatTextCapitalize,
} from "../../utils/helpers";

import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import EmptyList from "../../ui/EmptyList";

const StyledMainContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-0);
  padding: 2rem 2rem 15rem 2rem;
  width: 100%;
  position: relative;
`;

const SummaryLeftTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & p {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-grey-700);
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
  }
`;

const TransactionFlowTableContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  height: 70vh;
  width: 100%;
  padding-bottom: 6rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const EachTransactionListContainer = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  cursor: pointer;
`;

const LeftContainerWithIcon = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 1.5rem;
`;

const LeftContainerWithoutIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  & p {
    font-size: 1.4rem;
    color: var(--color-grey-800);
  }

  & span {
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }
`;

const RightContainerWithoutIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0rem;

  & p {
    font-size: 1.3rem;
  }

  & span {
    font-size: 1rem;
    padding: 0.1rem 0.7rem;
    border-radius: 9px;
  }
`;

const CreditPara = styled.p`
  color: var(--color-brand-700);
`;

const SuccessSpan = styled.span`
  background-color: var(--color-brand-100);
  color: var(--color-brand-800);
`;

const PendingPara = styled.p`
  color: #a50da5;
`;

const PendingSpan = styled.span`
  background-color: #a50da521;
  color: #a50da5;
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: ${({ $backColor }) => $backColor || "var(--color-grey-10)"};
  color: ${({ $color }) => $color || "var(--color-grey-700)"};

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: inherit;
  }
`;

function StockHistoriesContainer({ navigate, purchaseStock, singleStock }) {
  const totalPurchases = purchaseStock?.reduce((total, each) => {
    return total + each?.quantity * singleStock?.price;
  }, 0);

  return (
    <StyledMainContentContainer>
      {totalPurchases ? (
        <SummaryLeftTableContainer>
          <p>Histories</p>
          <div>
            <span>Total Values: {formatCurrency(totalPurchases, "USD")}</span>
          </div>
        </SummaryLeftTableContainer>
      ) : (
        ""
      )}

      {!purchaseStock?.length ? <EmptyList /> : ""}

      <TransactionFlowTableContainer>
        {purchaseStock?.map((each, i) => {
          return (
            <EachTransactionListContainer
              key={i}
              onClick={() => navigate(`${each?.id}/view`)}
            >
              <LeftContainerWithIcon>
                {each?.isCashedOut ? (
                  <SVGContainer
                    $backColor={"var(--color-green-backColor)"}
                    $color={"var(--color-brand-700)"}
                  >
                    <FiArrowDown />
                  </SVGContainer>
                ) : (
                  <SVGContainer
                    $backColor={"var(--color-green-backColor)"}
                    $color={"var(--color-brand-700)"}
                  >
                    <FiArrowUp />
                  </SVGContainer>
                )}

                <LeftContainerWithoutIcon>
                  <p>{formatTextCapitalize(singleStock?.symbole)}</p>
                  <span>{formatDate2(new Date(each?.created_at))}</span>
                </LeftContainerWithoutIcon>
              </LeftContainerWithIcon>

              {each?.isCashedOut ? (
                <RightContainerWithoutIcon>
                  <CreditPara>
                    +{formatCurrency(each?.totalCashedOut)}
                  </CreditPara>
                  <SuccessSpan>
                    <span>{`${each?.quantity}x`}</span>
                    {formatCurrency(each?.totalCost / each?.quantity, "USD")}
                  </SuccessSpan>
                </RightContainerWithoutIcon>
              ) : (
                ""
              )}

              {each?.isCashedOut === false ? (
                <RightContainerWithoutIcon>
                  <PendingPara>
                    {formatCurrency(singleStock?.price * each?.quantity, "USD")}
                  </PendingPara>
                  <PendingSpan>
                    <span>{`${each?.quantity}x`}</span>

                    {formatCurrency(each?.totalCost / each?.quantity, "USD")}
                  </PendingSpan>
                </RightContainerWithoutIcon>
              ) : (
                ""
              )}
            </EachTransactionListContainer>
          );
        })}
      </TransactionFlowTableContainer>
    </StyledMainContentContainer>
  );
}

export default StockHistoriesContainer;
