import { FiChevronRight, FiStar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DragScrollX from "../../ui/DragScrollToRight";
import { formatCurrency } from "../../utils/helpers";

const AllStockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem;
`;

const HeaderTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-grey-800);

  & h4 {
    font-size: 1.6rem;
  }

  & span {
    font-size: 1.2rem;
    text-decoration: underline;
  }
`;

const EachGreatStocksToInvestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  background-color: var(--color-grey-0);
  box-shadow: 0 1px 5px #00000011;
  width: 15rem;

  position: relative;
`;

const ImageLogo = styled.div`
  width: 15rem;
  height: 16rem;
  background-color: var(--color-grey-0);
  overflow: hidden;

  & img {
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

const EachGreatStocksContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  padding: 0rem 0.31rem 1rem;

  & p {
    font-size: 1.3rem;
    text-transform: uppercase;
  }
`;

const EachGreatStocksContentLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    color: var(--color-grey-400);
    font-size: 1rem;
  }

  & svg {
    color: var(--color-grey-800);
    font-size: 1.8rem;
  }
`;

const StarLogoContainer = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: var(--color-green-backColors);
  overflow: hidden;

  position: absolute;
  top: 1rem;
  right: 1rem;

  & svg {
    height: 2rem;
    width: 2rem;
    color: var(--color-grey-400);
  }
`;

function AllStocksContainer({ stockData, type = "Go Stable" }) {
  const navigate = useNavigate();


  return (
    <>
      {stockData?.length ? (
        <AllStockContainer>
          <HeaderTopContainer>
            <h4>{type}</h4>

            {/* <span>See all</span> */}
          </HeaderTopContainer>

          <DragScrollX>
            {stockData?.map((each, i) => {
              return (
                <EachGreatStocksToInvestContainer
                  key={i}
                  onClick={() => navigate(`${each?.id}/stock`)}
                >
                  <ImageLogo>
                    <img src={each?.image} />
                  </ImageLogo>

                  <EachGreatStocksContentContainer>
                    <p>{`${each?.symbole} | ${each.sector}`}</p>

                    <EachGreatStocksContentLink>
                      <span>{`${formatCurrency(
                        each?.price,
                        "USD"
                      )} Per Shares`}</span>
                      <FiChevronRight />
                    </EachGreatStocksContentLink>
                  </EachGreatStocksContentContainer>

                  <StarLogoContainer>
                    <FiStar />
                  </StarLogoContainer>
                </EachGreatStocksToInvestContainer>
              );
            })}
          </DragScrollX>
        </AllStockContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default AllStocksContainer;
