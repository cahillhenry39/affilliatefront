import styled, { css } from "styled-components";
import Button from "./Button";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import SpinnerAndText from "./SpinnerAndText";
import { formatCurrency } from "../utils/helpers";
import { Command, Key } from "lucide-react";
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
          transform: translateX(200%);
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
    font-size: 1.6rem;

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

function TokenDeposits({
  showButtons = true,
  tokenDepositMessage = {},
  handleDepositToken,
  isWorking = false,
}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function handleGetAmount(data) {
    const { token, tokenKey } = data;

    if (!token || !tokenKey) {
      toast.error("Please provide a valid token and key");
      return;
    }

    handleDepositToken(token, tokenKey);
  }

  return (
    <StyledFIrstSectionContainer $showButtons={showButtons?.toString()}>
      <StyledCOntainerFirst>
        <InputContainerMain>
          <p>Token</p>
          <InputContainer>
            <input placeholder="Provide token" {...register("token")} />
            <SVGContainer>
              <Command />
            </SVGContainer>
          </InputContainer>
        </InputContainerMain>

        <InputContainerMain>
          <p>Token Key</p>
          <InputContainer>
            <input placeholder="Provide token key" {...register("tokenKey")} />
            <SVGContainer>
              <Key />
            </SVGContainer>
          </InputContainer>
        </InputContainerMain>

        <StyledButton>
          <Button type={"primary"} onClick={handleSubmit(handleGetAmount)}>
            {isWorking ? (
              <SpinnerAndText message={"Processing"} />
            ) : (
              <>
                <HiMiniArrowRightCircle /> Deposit
              </>
            )}
          </Button>

          {tokenDepositMessage?.type === "success" ? (
            <Button type={"primary"} onClick={() => navigate("/app")}>
              Go Back Home
            </Button>
          ) : (
            ""
          )}
        </StyledButton>
      </StyledCOntainerFirst>

      {tokenDepositMessage?.type === "error" ? (
        <ErrorMessage>{tokenDepositMessage?.message}</ErrorMessage>
      ) : (
        ""
      )}

      {tokenDepositMessage?.type === "success" ? (
        <SuccessMessage>{`You have made a successful deposit of ${formatCurrency(
          tokenDepositMessage?.data?.amount
        )} into your account.`}</SuccessMessage>
      ) : (
        ""
      )}
    </StyledFIrstSectionContainer>
  );
}

export default TokenDeposits;
