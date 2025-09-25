import styled from "styled-components";
import EmptyData from "../../ui/EmptyData";
import {
  formatCurrency,
  formatDate2,
  sortArrayDesc,
} from "../../utils/helpers";

const StyledRevenue = styled.div`
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
  background-color: #00000089;
  border-radius: 0.51rem;
  box-shadow: var(--shadow-sm);
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
  color: var(--color-brand-100);
`;

const TransactionAmount = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: #08ec08;
  justify-self: start;
`;

const TransactionDate = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--color-brand-100);
`;

function RevenueInvoice({ data }) {
  if (!data?.length)
    return (
      <EmptyData
        message="No revenue generated yet"
        button={true}
        link="/app"
        buttonMessage="go back home"
        image="/noData.jpg"
      />
    );

  const sortedData = sortArrayDesc(data);

  return (
    <StyledRevenue>
      {sortedData.map((each, i) => (
        <EachTransactionDiv key={i}>
          <TransactionRef>{each.reference}</TransactionRef>
          <TransactionComment>{each.message}</TransactionComment>
          <TransactionAmount>+ {formatCurrency(each.amount)}</TransactionAmount>
          <TransactionDate>{formatDate2(each.created_at)}</TransactionDate>
        </EachTransactionDiv>
      ))}
    </StyledRevenue>
  );
}

export default RevenueInvoice;
