import styled, { css } from "styled-components";
import NairaSVG from "./NairaSVG";
import Button from "./Button";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import SpinnerAndText from "./SpinnerAndText";
import { formatCurrencyParts } from "../utils/helpers";

const StyledFIrstSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition: all 0.4s;
  position: absolute;
  width: calc(100% - 2rem); /* 👈 full width minus gutters */

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
          transform: translateX(-200%);
          opacity: 0;
          z-index: 0;

          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        `}
`;

const StyledCOntainerFirst = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--color-grey-0);
  padding: 2rem 1rem;

  border-radius: 9px;
  color: var(--color-grey-700);
  box-shadow: 0px 0px 4px #00000018;
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
    padding-left: 3rem;
    padding-top: 0.41rem;
    border-bottom: 2px solid var(--color-brand-700);
    font-size: 1.8rem;

    &:disabled {
      color: var(--color-grey-100);
    }
  }
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;

  transform: translate(0%, -50%);
`;

const StyledCOntainerSecond = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.2rem;
  margin-top: 1rem;
  width: 100%;
  color: var(--color-grey-600);
`;

const EachAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  width: 100%;

  background-color: var(--color-grey-10);
  border: 1px solid var(--color-grey-10);

  border-radius: 5px;
  padding: 1rem 0.2rem;
  cursor: pointer;

  & p {
    font-size: 1.2rem;
    margin-top: 0.1rem;
  }

  ${(props) =>
    props.$isSelected === "true" &&
    css`
      border: 1px solid var(--color-brand-700);
      & p {
        color: var(--color-brand-700);
      }
    `}
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

function DepositInputButtons({
  showButtons = true,
  amount = "",
  setAmount = () => {},
  onSubmitData,
  isWorking = false,
}) {
  const amountArray = [
    1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000,
  ];

  function handleSetAmount({ value, type }) {
    if (type === "input") {
      // Remove commas
      const rawValue = value.replace(/,/g, "");

      // Allow empty field
      if (rawValue === "") {
        setAmount("");
        return;
      }

      // Parse number
      const numericValue = parseFloat(rawValue);
      if (isNaN(numericValue)) {
        // Don’t update if invalid (e.g. typing letters)
        return;
      }

      // Format back with commas
      const formatted = new Intl.NumberFormat("en-NG").format(numericValue);
      setAmount(formatted);
    } else {
      // Button click → always clean format
      setAmount(formatCurrencyParts(value, "NGN")?.amount);
    }
  }

  return (
    <StyledFIrstSectionContainer $showButtons={showButtons?.toString()}>
      <StyledCOntainerFirst>
        <p>Amount</p>
        <InputContainer>
          <input
            placeholder="1,000.00 - 1,000,000.00"
            value={amount}
            onChange={(e) =>
              handleSetAmount({ value: e.target.value, type: "input" })
            }
          />
          <SVGContainer>
            <NairaSVG color={"var(--color-grey-700)"} width="1.5rem" />
          </SVGContainer>
        </InputContainer>
        <StyledCOntainerSecond>
          {amountArray?.map((each, i) => {
            return (
              <EachAmountContainer
                key={i}
                onClick={() =>
                  handleSetAmount({ value: each, type: "content" })
                }
                $isSelected={(
                  each ===
                  parseInt(amount?.replace(/,/g, "")?.split(".")[0], 10)
                )?.toString()}
              >
                <NairaSVG
                  color={
                    each ===
                    parseInt(amount?.replace(/,/g, "")?.split(".")[0], 10)
                      ? "var(--color-brand-700)"
                      : "var(--color-grey-600)"
                  }
                  width="1.2rem"
                />
                <p>{formatCurrencyParts(each, "NGN")?.amount}</p>
              </EachAmountContainer>
            );
          })}
        </StyledCOntainerSecond>

        <StyledButton>
          <Button type={"primary"} onClick={onSubmitData}>
            {isWorking ? (
              <SpinnerAndText message={"Processing"} />
            ) : (
              <>
                <HiMiniArrowRightCircle /> Proceed
              </>
            )}
          </Button>
        </StyledButton>
      </StyledCOntainerFirst>
    </StyledFIrstSectionContainer>
  );
}

export default DepositInputButtons;
