import styled, { css } from "styled-components";
import EmptyData from "../../ui/EmptyData";
import {
  formatCurrency,
  formatDate2,
  sortArrayDesc,
} from "../../utils/helpers";

const StyledDepositRevenue = styled.div`
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
  background-color: #0000008f;
  border-radius: 0.51rem;
  box-shadow: var(--shadow-sm);

  ${(props) =>
    props.$isFailed === "true" &&
    css`
      border: 1px solid orangered;
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
    props.$isFailed === "true"
      ? css`
          color: orangered;
          /* background-color: var(--color-grey-50); */
          padding: 0.3rem 1rem;
        `
      : css`
          color: #08ec08;
          /* background-color: var(--color-grey-50); */
          padding: 0.3rem 1rem;
        `}
`;

const TransactionAmount = styled.p`
  justify-self: start;

  ${(props) =>
    props.$isSuccess === "pending"
      ? css`
          color: var(--color-grey-400);
          font-size: 1.5rem;
        `
      : props.$isSuccess === "failed"
      ? css`
          color: orangered;
          font-size: 1.5rem;
        `
      : css`
          color: #08ec08;
          font-weight: 600;
          font-size: 1.6rem;
        `}
`;

const TransactionDate = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--color-brand-100);
`;

function DepositRevenue({ data }) {
  if (!data?.length)
    return (
      <EmptyData
        message="No deposit yet"
        button={true}
        link="/app"
        buttonMessage="go back home"
        image="/noData.jpg"
      />
    );

  const sortedData = sortArrayDesc(data);

  return (
    <StyledDepositRevenue>
      {sortedData.map((each, i) => (
        <EachTransactionDiv
          key={i}
          $isFailed={(each.status === "failed").toString()}
        >
          <TransactionRef>{each.reference}</TransactionRef>
          <TransactionComment $isFailed={(each.status === "failed").toString()}>
            {each.status}
          </TransactionComment>
          <TransactionAmount $isSuccess={each.status}>
            {formatCurrency(each.amount)}
          </TransactionAmount>
          <TransactionDate>{formatDate2(each.created_at)}</TransactionDate>
        </EachTransactionDiv>
      ))}
    </StyledDepositRevenue>
  );
}

export default DepositRevenue;
