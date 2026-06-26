import styled from "styled-components";

import { useGetAllMyTransaction } from "../../features/transaction/useTransaction";
import useUser from "../../features/authentication/useUser";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { useState } from "react";
import TransactionHeaderFilter from "../../features/transaction/TransactionHeaderFilter";
import {
  formatCurrency,
  formatDate2,
  formatTextCapitalize,
} from "../../utils/helpers";

import { FiGift, FiArrowUp, FiArrowDown, FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TaskLoader from "../../features/task/TaskLoader";
import EmptyList from "../../ui/EmptyList";

const StyledContainer = styled.div`
  overflow: hidden;
  height: 100vh;
`;

const StyledTransaction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-grey-0);
  height: 100vh;
  margin: 0rem 1rem;
  padding: 2rem 1.5rem 6rem;
  border-top-right-radius: 9px;
  border-top-left-radius: 9px;
`;

const SummaryTableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
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

// const SummaryRightTableContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   font-size: 1.2rem;
//   color: var(--color-grey-10);
//   background-color: var(--color-brand-700);
//   cursor: pointer;
//   height: fit-content;
//   padding: 0.31rem 0.71rem;
//   border-radius: 13px;
// `;

const TransactionFlowTableContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  height: 70vh;
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

const FailedPara = styled.p`
  color: orangered;
`;

const FailedSpan = styled.span`
  background-color: #ff440026;
  color: orangered;
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

function Transactions() {
  const navigate = useNavigate();
  const { data } = useUser();
  const { allMyTransactions, totalEarnings, totalSpent, isLoading } =
    useGetAllMyTransaction(data?.id);

  const [filterOption, setFilterOption] = useState({
    category: "all category",
    status: "all status",
  });

  const filteredTransaction = allMyTransactions?.filter((transaction) => {
    const categoryMatch =
      filterOption.category === "all category" ||
      transaction?.type?.toLowerCase() === filterOption.category.toLowerCase();

    const statusMatch =
      filterOption.status === "all status" ||
      transaction?.status?.toLowerCase() === filterOption.status.toLowerCase();

    return categoryMatch && statusMatch;
  });

  const displayedTransactions = filteredTransaction ?? [];

  {
    /* <SummaryRightTableContainer>Analysis</SummaryRightTableContainer> */
  }

  return (
    <>
      <HeaderNavigationBack text={"Transactions"} />
      <TransactionHeaderFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <StyledContainer>
          {!displayedTransactions?.length ? (
            <EmptyList />
          ) : (
            <StyledTransaction>
              <SummaryTableContainer>
                <SummaryLeftTableContainer>
                  <p>Summary</p>
                  <div>
                    <span>In: {formatCurrency(totalSpent)}</span>
                    <span>Credit: {formatCurrency(totalEarnings)}</span>
                  </div>
                </SummaryLeftTableContainer>
              </SummaryTableContainer>

              <TransactionFlowTableContainer>
                {displayedTransactions?.map((each, i) => {
                  return (
                    <EachTransactionListContainer
                      key={i}
                      onClick={() => navigate(`${each?.id}`)}
                    >
                      <LeftContainerWithIcon>
                        {each?.type === "credit" ? (
                          <SVGContainer
                            $backColor={"var(--color-green-backColor)"}
                            $color={"var(--color-brand-700)"}
                          >
                            <FiGift />
                          </SVGContainer>
                        ) : each?.type === "debit" ? (
                          <SVGContainer
                            $backColor={"var(--color-green-backColor)"}
                            $color={"var(--color-brand-700)"}
                          >
                            <FiMinusCircle />
                          </SVGContainer>
                        ) : each?.type === "deposit" ? (
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
                          <p>{formatTextCapitalize(each?.message)}</p>
                          <span>{formatDate2(new Date(each?.created_at))}</span>
                        </LeftContainerWithoutIcon>
                      </LeftContainerWithIcon>

                      {each?.status === "success" ? (
                        <RightContainerWithoutIcon>
                          <CreditPara>
                            +{formatCurrency(each?.amount)}
                          </CreditPara>
                          <SuccessSpan>
                            {formatTextCapitalize(each?.status)}
                          </SuccessSpan>
                        </RightContainerWithoutIcon>
                      ) : (
                        ""
                      )}

                      {each?.status === "pending" ? (
                        <RightContainerWithoutIcon>
                          <PendingPara>
                            {formatCurrency(each?.amount)}
                          </PendingPara>
                          <PendingSpan>
                            {formatTextCapitalize(each?.status)}
                          </PendingSpan>
                        </RightContainerWithoutIcon>
                      ) : (
                        ""
                      )}

                      {each?.status === "failed" ? (
                        <RightContainerWithoutIcon>
                          <FailedPara>
                            -{formatCurrency(each?.amount)}
                          </FailedPara>
                          <FailedSpan>
                            {formatTextCapitalize(each?.status)}
                          </FailedSpan>
                        </RightContainerWithoutIcon>
                      ) : (
                        ""
                      )}
                    </EachTransactionListContainer>
                  );
                })}
              </TransactionFlowTableContainer>
            </StyledTransaction>
          )}
        </StyledContainer>
      )}
    </>
  );
}

export default Transactions;
