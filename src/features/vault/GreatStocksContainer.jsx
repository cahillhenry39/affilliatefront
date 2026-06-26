import styled, { css } from "styled-components";
import { FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatCurrencyParts, formatTextCapitalize } from "../../utils/helpers";

const GreatStocksToInvestMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem;

  & h3 {
    font-size: 2rem;
    color: var(--color-grey-700);
  }
`;

const GreatStocksToInvestContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
`;

const EachGreatStocksToInvestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  background-color: var(--color-grey-0);
  padding: 2rem 1rem 1rem;
  border-radius: 9px;
  box-shadow: 0 1px 5px #00000011;
  cursor: pointer;
  position: relative;
`;

const ImageLogo = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-grey-10);
  overflow: hidden;

  & img {
    height: 4rem;
    width: 4rem;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

const TitleAndAmountAndIncrease = styled.div`
  & h5 {
    color: var(--color-grey-700);
    font-size: 1.4rem;
  }

  & p {
    color: var(--color-grey-700);
    font-size: 1.2rem;
  }

  & span {
    font-size: 1.2rem;
  }
`;

const PercentagePara = styled.span`
  ${(props) =>
    props.$isHigher === "true"
      ? css`
          color: var(--color-brand-700);
        `
      : css`
          color: orangered;
        `}
`;

const StarLogoContainer = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: var(--color-green-backColor);
  overflow: hidden;

  position: absolute;
  top: 1rem;
  right: 1rem;

  & svg {
    height: 2rem;
    width: 2rem;
    color: var(--color-brand-900);
  }
`;

function GreatStocksContainer({ isTopStocks }) {
  const navigate = useNavigate();

  return (
    <GreatStocksToInvestMainContainer>
      <h3>Great Stocks Predicted To Grow</h3>

      <GreatStocksToInvestContainer>
        {isTopStocks?.map((each, i) => {
          const isIncreament = each?.price > each?.lastPrice;

          const currentPercentage =
            ((each?.price - each?.lastPrice) / each?.lastPrice) * 100;

          return (
            <EachGreatStocksToInvestContainer
              onClick={() => navigate(`${each?.id}/stock`)}
              key={i}
            >
              <ImageLogo>
                <img src={each?.logo} />
              </ImageLogo>

              <TitleAndAmountAndIncrease>
                <h5>{formatTextCapitalize(each?.symbole)}</h5>
                <p>${formatCurrencyParts(each?.price)?.amount}</p>
                <PercentagePara $isHigher={isIncreament?.toString()}>
                  {`${isIncreament ? "+ " : "- "}${currentPercentage?.toFixed(
                    1
                  )}%`}
                </PercentagePara>
              </TitleAndAmountAndIncrease>

              <StarLogoContainer>
                <FiStar />
              </StarLogoContainer>
            </EachGreatStocksToInvestContainer>
          );
        })}
      </GreatStocksToInvestContainer>
    </GreatStocksToInvestMainContainer>
  );
}

export default GreatStocksContainer;
