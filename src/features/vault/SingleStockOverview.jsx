import styled from "styled-components";
import SingleStockBody from "./SingleStockBody";
import { FiStar } from "react-icons/fi";
import SingleStockHeader from "./SingleStockHeader";

const StyledMainContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-0);
  padding: 2rem 2rem 15rem 2rem;

  width: 100%; /* take full slider width */
  box-sizing: border-box;

  position: relative;
`;

const StarLogoContainer = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: var(--color-green-backColors);
  overflow: hidden;

  position: absolute;
  top: 2rem;
  right: 1rem;

  & svg {
    height: 2rem;
    width: 2rem;
    color: var(--color-grey-400);
  }
`;

const StyledButton = styled.div`
  position: sticky;
  bottom: 3rem;
  right: 0rem;
  left: 0;

  & button {
    /* background-color: #8884d84b;
    color: #8884d8; */

    background-color: var(--color-brand-800);
    color: var(--color-brand-100);
    font-weight: 600;
    border: none;
    padding: 1.4rem 0;
    width: 100%;
    border-radius: 22px;
  }
`;

function SingleStockOverview({ setShowPage, singleStock }) {
  return (
    <StyledMainContentContainer>
      <StarLogoContainer>
        <FiStar />
      </StarLogoContainer>

      <SingleStockHeader singleStock={singleStock} />

      <SingleStockBody singleStock={singleStock} />

      {!singleStock?.marketOpen ? (
        <StyledButton>
          <button onClick={() => setShowPage("purchase")}>Buy Stock</button>
        </StyledButton>
      ) : (
        ""
      )}
    </StyledMainContentContainer>
  );
}

export default SingleStockOverview;
