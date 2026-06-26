import styled from "styled-components";
import { FiGift, FiArrowUp, FiArrowDown, FiMinusCircle } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi2";
import {
  formatCurrency,
  formatDate2,
  formatTextCapitalize,
} from "../../utils/helpers";

const StyledFirstContainer = styled.div`
  position: relative;

  background-color: var(--color-grey-0);
  padding: 4rem 2rem 2rem;
  margin: 1rem 1rem 0rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  border-radius: 9px;
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  background-color: ${({ $backColor }) => $backColor || "var(--color-grey-10)"};
  color: ${({ $color }) => $color || "var(--color-grey-700)"};

  position: absolute;
  top: -1.5rem;
  right: 50%;
  transform: translate(50%, 0);

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: inherit;
  }
`;

const MessageTitlePara = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-900);
`;

const AmountH3 = styled.h3`
  font-size: 2rem;
  color: var(--color-grey-800);
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.21rem;
  text-align: center;

  & p {
    font-size: 1.2rem;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CreditPara = styled.p`
  color: var(--color-brand-700);
`;
const SuccessSVG = styled(HiCheckCircle)`
  color: var(--color-brand-700);
`;

const PendingPara = styled.p`
  color: #a50da5;
`;

const PendingSVG = styled(HiCheckCircle)`
  color: #a50da5;
`;
const FailedPara = styled.p`
  color: orangered;
`;

const FailedSVG = styled(HiCheckCircle)`
  color: orangered;
`;

const StyledSecondContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 4rem 2rem 2rem;
  margin: 0rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 9px;
`;

const StyledSecondHeader = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const EachSecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    & p {
      font-size: 1.2rem;
      color: var(--color-grey-500) !important;
    }

    & span {
      font-size: 1.4rem;
      color: var(--color-grey-700);
    }
  }
`;

function SingleDepositBody({ aTransactions }) {
  const { amount, status, created_at, message, type, reference, userFullName } =
    aTransactions;

  return (
    <>
      <StyledFirstContainer>
        {type === "credit" ? (
          <SVGContainer
            $backColor={"var(--color-green-backColor)"}
            $color={"var(--color-brand-700)"}
          >
            <FiGift />
          </SVGContainer>
        ) : (
          ""
        )}

        {type === "debit" ? (
          <SVGContainer $backColor={"#ff440026"} $color={"#ff4400d1"}>
            <FiMinusCircle />
          </SVGContainer>
        ) : (
          ""
        )}

        {type === "withdrawal" ? (
          <SVGContainer
            $backColor={"var(--color-green-backColor)"}
            $color={"var(--color-brand-700)"}
          >
            <FiArrowUp />
          </SVGContainer>
        ) : (
          ""
        )}

        {type === "deposit" ? (
          <SVGContainer
            $backColor={"var(--color-green-backColor)"}
            $color={"var(--color-brand-700)"}
          >
            <FiArrowDown />
          </SVGContainer>
        ) : (
          ""
        )}

        <MessageTitlePara>{formatTextCapitalize(message)}</MessageTitlePara>
        <AmountH3>{formatCurrency(amount)}</AmountH3>

        {status === "success" ? (
          <StatusContainer>
            <SuccessSVG />
            <CreditPara>{"Successful"}</CreditPara>
          </StatusContainer>
        ) : (
          ""
        )}

        {status === "failed" ? (
          <StatusContainer>
            <FailedSVG />
            <FailedPara>{"Failed"}</FailedPara>
          </StatusContainer>
        ) : (
          ""
        )}

        {status === "pending" ? (
          <StatusContainer>
            <PendingSVG />
            <PendingPara>{"Pending"}</PendingPara>
          </StatusContainer>
        ) : (
          ""
        )}
      </StyledFirstContainer>

      <StyledSecondContainer>
        <StyledSecondHeader>Transaction Details</StyledSecondHeader>

        <EachSecondContainer>
          <div>
            <p>User Name</p>
            <span>{formatTextCapitalize(userFullName)}</span>
          </div>

          <div>
            <p>Reference</p>
            <span>{reference}</span>
          </div>

          <div>
            <p>Transaction Type</p>
            <span>{formatTextCapitalize(type)}</span>
          </div>

          <div>
            <p>Transaction Date</p>
            <span>{formatDate2(new Date(created_at))}</span>
          </div>

          <div>
            <p>Status</p>
            <span>{formatTextCapitalize(status)}</span>
          </div>
        </EachSecondContainer>
      </StyledSecondContainer>
    </>
  );
}

export default SingleDepositBody;
