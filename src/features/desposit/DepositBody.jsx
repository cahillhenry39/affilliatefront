import { useState } from "react";
import { HiMiniPlusCircle } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const DepositDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;
`;

const EachDepositDiv = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr;

  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.5rem 1rem;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: 9px;
  transition: all 0.3s;

  & img {
    width: 12rem;
  }

  ${(props) =>
    props.$isSelected === "true" &&
    css`
      border: 1px solid var(--color-brand-800);
      color: var(--color-brand-800);
    `}
`;

const DepositDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & p {
    font-size: 1rem;
    & span {
      font-size: 1.2rem;
    }
  }
`;

const SVGDiv = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-50);
  transition: all 0.3s;

  & svg {
    width: 3rem;
    height: 3rem;
  }

  ${(props) =>
    props.$isSelected === "true" &&
    css`
      color: var(--color-brand-800);
    `}
`;

function DepositBody({ allDepositBank }) {
  const [bankSelected, setBankSelected] = useState("");

  return (
    <DepositDiv>
      {allDepositBank.map((each, i) => (
        <EachDepositDiv
          key={i}
          $isSelected={(bankSelected?.id === each?.id)?.toString()}
          onClick={() =>
            setBankSelected((val) => {
              return each?.id === val?.id ? "" : each;
            })
          }
        >
          <SVGDiv $isSelected={(bankSelected?.id === each?.id)?.toString()}>
            <HiMiniPlusCircle />
          </SVGDiv>

          <div>
            <img src={each.image} alt={each.depositName} />
          </div>

          <DepositDetails>
            <div>
              <p>
                Min: <span>{formatCurrency(each.minAmount)}</span>
              </p>
              <p>
                Max: <span>{formatCurrency(each.maxAmount)}</span>
              </p>
              <p>
                Duration: <span>Instant</span>
              </p>
            </div>
          </DepositDetails>
        </EachDepositDiv>
      ))}
    </DepositDiv>
  );
}

export default DepositBody;
