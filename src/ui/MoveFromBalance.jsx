import styled, { css } from "styled-components";
import Button from "./Button";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import SpinnerAndText from "./SpinnerAndText";
import { formatCurrency } from "../utils/helpers";
import { ArrowLeftRight } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledFIrstSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition: all 0.4s;

  overflow: hidden;

  width: calc(100% - 2rem); /* 👈 full width minus gutters */

  /* margin: 0rem 1rem; */

  ${(props) =>
    props.$showButtons === "true"
      ? css`
          transform: translateX(0);
          opacity: 1;
          z-index: 1;

          pointer-events: auto;
          position: relative;
        `
      : css`
          transform: translateX(
            ${props.$currentDepositType === "token" ? -200 : 200}%
          );
          opacity: 0;
          z-index: 0;

          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
        `}
`;

const StyledCOntainerFirst = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-grey-0);
  padding: 2rem 1rem;

  border-radius: 9px;
  color: var(--color-grey-700);
  box-shadow: 0px 0px 4px #00000018;
`;

const InputContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;

  & p {
    font-size: 1.5rem;
  }
`;

const BalancePara = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const ExpenseContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;
  margin-top: -1.5rem;

  & p {
    font-size: 1.5rem;
  }

  & span {
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const InputContainer = styled.div`
  display: flex;
  background-color: var(--color-grey-10);
  height: 5rem;
  width: 100%;
  position: relative;
  border-radius: 9px;
  overflow: hidden;

  & input {
    background-color: var(--color-grey-10);
    border: none;

    height: 5rem;
    width: 100%;
    padding-left: 4rem;
    padding-top: 0.41rem;
    border-bottom: 2px solid var(--color-brand-700);
    font-size: 1.4rem;

    &:disabled {
      color: var(--color-grey-100);
    }
  }
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;

  transform: translate(0%, -35%);

  & svg {
    width: 2rem;
  }
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
`;

const SuccessMessage = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-brand-700);
  text-transform: uppercase;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: orangered;
  text-transform: uppercase;
`;

function MoveFromBalance({
  showButtons = true,
  moveMoneyMessage = {},
  handleMoveMoney,
  isWorking = false,
  currentDepositType,
  balance = 0,
  expenseBal = 0,
}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function handleGetAmount(data) {
    const { amount } = data;

    if (!amount) {
      toast.error("Please provide a valid amount");
      return;
    }

    handleMoveMoney(amount);
  }

  return (
    <StyledFIrstSectionContainer
      $showButtons={showButtons?.toString()}
      $currentDepositType={currentDepositType}
    >
      <StyledCOntainerFirst>
        <InputContainerMain>
          <p>Balance</p>
          <BalancePara>{formatCurrency(balance)}</BalancePara>
        </InputContainerMain>

        <ExpenseContainer>
          <p>Total Expense</p>
          <span>{formatCurrency(expenseBal)}</span>
        </ExpenseContainer>

        <InputContainerMain>
          <p>Transfer Amount?</p>
          <InputContainer>
            <input
              placeholder="Provide amount"
              {...register("amount", {
                valueAsNumber: true, // ensures the value is stored as a number
              })}
            />
            <SVGContainer>
              <ArrowLeftRight />
            </SVGContainer>
          </InputContainer>
        </InputContainerMain>

        <StyledButton>
          <Button type={"primary"} onClick={handleSubmit(handleGetAmount)}>
            {isWorking ? (
              <SpinnerAndText message={"Processing"} />
            ) : (
              <>
                <HiMiniArrowRightCircle /> Transfer
              </>
            )}
          </Button>

          {moveMoneyMessage?.type === "success" ? (
            <Button type={"primary"} onClick={() => navigate("/app")}>
              Go Back Home
            </Button>
          ) : (
            ""
          )}
        </StyledButton>
      </StyledCOntainerFirst>

      {moveMoneyMessage?.type === "error" ? (
        <ErrorMessage>{moveMoneyMessage?.message}</ErrorMessage>
      ) : (
        ""
      )}

      {moveMoneyMessage?.type === "success" ? (
        <SuccessMessage>{`You have successful moved ${formatCurrency(
          moveMoneyMessage?.data?.amount
        )} to expense account.`}</SuccessMessage>
      ) : (
        ""
      )}
    </StyledFIrstSectionContainer>
  );
}

export default MoveFromBalance;
