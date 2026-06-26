import styled from "styled-components";
import StockCharts from "./StockCharts";
import { HiArrowDown } from "react-icons/hi2";
import { FiSunset } from "react-icons/fi";
import { formatCurrencyParts } from "../../utils/helpers";
import { HiArrowUp } from "react-icons/hi";

const SeondContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

const MainAmountPara = styled.p`
  font-size: 2rem;
  color: var(--color-grey-800);
`;

const CoureDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-500);

  & span {
    font-size: 1.3rem;
  }
`;

const AmountSignalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: purple;

  & span {
    font-size: 1.3rem;
  }
  & svg {
    font-size: 1.3rem;
  }
`;

const OptionalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-300);

  & span {
    font-size: 1.3rem;
  }
`;

function SingleStockBody({ singleStock }) {
  const { weeklyValues, lastPrice, marketOpen, price } = singleStock;

  const isHigher = price > lastPrice;
  const currentPercentage = ((price - lastPrice) / lastPrice) * 100;

  return (
    <SeondContainerContent>
      <MainAmountPara>${formatCurrencyParts(price)?.amount}</MainAmountPara>

      <CoureDetailsContainer>
        <span>
          {isHigher ? "+" : "-"}$
          {formatCurrencyParts(Math.abs(price - lastPrice))?.amount}
        </span>

        <AmountSignalContainer>
          {isHigher ? <HiArrowUp /> : <HiArrowDown />}
          <span>{Math.abs(currentPercentage)?.toFixed(1)}%</span>
        </AmountSignalContainer>

        <span> Past day</span>
      </CoureDetailsContainer>

      {marketOpen ? (
        <OptionalContainer>
          <AmountSignalContainer>
            <FiSunset />
            <span>Market closed -</span>
          </AmountSignalContainer>

          <div>
            <span>Reopens at 12:30 AM</span>
          </div>
        </OptionalContainer>
      ) : (
        ""
      )}

      <StockCharts weeklyValues={weeklyValues} />
    </SeondContainerContent>
  );
}

export default SingleStockBody;
