import styled from "styled-components";
import EmptyData from "../../ui/EmptyData";
import {
  formatCurrency,
  formatDate2,
  sortArrayDesc,
} from "../../utils/helpers";

const StyledInvoiceFees = styled.div`
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
  background-color: #00000016;
  border-radius: 0.51rem;
  box-shadow: var(--shadow-sm);
`;

const TransactionRef = styled.p`
  font-size: 1.4rem;
  color: green;
  justify-self: start;
`;

const TransactionComment = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;
`;

const TransactionAmount = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: green;
  justify-self: start;
`;

const TransactionDate = styled.p`
  font-size: 1.3rem;
  justify-self: end;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

function InvoiceFees({ data, secondData }) {
  if (!data?.length && !secondData?.length)
    return (
      <EmptyData
        message="No fees charged "
        button={true}
        link="/app"
        buttonMessage="go back home"
        image="/noData.jpg"
      />
    );

  const feesDataArray = [...data, ...secondData];
  const sortedData = sortArrayDesc(feesDataArray);

  return (
    <StyledInvoiceFees>
      {sortedData.map((each, i) => (
        <EachTransactionDiv key={i}>
          <TransactionRef>{each.reference}</TransactionRef>
          <TransactionComment>{each.message}</TransactionComment>
          <TransactionAmount>{formatCurrency(each.amount)}</TransactionAmount>
          <TransactionDate>{formatDate2(each.created_at)}</TransactionDate>
        </EachTransactionDiv>
      ))}
    </StyledInvoiceFees>
  );
}

export default InvoiceFees;
