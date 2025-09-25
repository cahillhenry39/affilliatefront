import styled, { css } from "styled-components";
import EmptyData from "../../ui/EmptyData";
import {
  formatCurrency,
  formatDate2,
  sortArrayDesc,
} from "../../utils/helpers";

const StyledWithdrawal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EachTransactionDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.51rem;
  border: 1.5px solid var(--color-grey-100);
  padding: 0.51rem 2rem;
  background-color: #00000088;
  border-radius: 0.51rem;
  box-shadow: var(--shadow-sm);

  ${(props) =>
    props.$isFailed === "true" &&
    css`
      border: 1px solid orangered;
      /* background-color: var(--color-grey-0); */
    `}
`;

const TransactionRef = styled.p`
  font-size: 1.4rem;
  color: #08ec08;
  justify-self: start;
`;

const TransactionComment = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;

  ${(props) =>
    props.$isSuccess === "pending"
      ? css`
          color: var(--color-grey-700);
        `
      : props.$isSuccess === "failed"
      ? css`
          color: orangered;
        `
      : css`
          color: #08ec08;
          font-weight: 600;
        `}
`;

const TransactionAmount = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: orangered;
  justify-self: start;
`;

const TransactionDate = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--color-brand-100);
`;

function WithdrawalInvoice({ data }) {
  if (!data?.length)
    return (
      <EmptyData
        message="No Withdrawal yet"
        button={true}
        link="/app"
        buttonMessage="go back home"
        image="/noData.jpg"
      />
    );
  const sortedData = sortArrayDesc(data);

  return (
    <StyledWithdrawal>
      {sortedData.map((each, i) => (
        <EachTransactionDiv
          key={i}
          $isFailed={(each.status === "failed").toString()}
        >
          <TransactionRef>{each.reference}</TransactionRef>
          <TransactionComment $isSuccess={each.status}>
            {each.status}
          </TransactionComment>
          <TransactionAmount>{formatCurrency(each.amount)}</TransactionAmount>
          <TransactionDate>{formatDate2(each.created_at)}</TransactionDate>
        </EachTransactionDiv>
      ))}
    </StyledWithdrawal>
  );
}

export default WithdrawalInvoice;
