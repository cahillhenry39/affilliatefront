import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import useUser from "../../features/authentication/useUser";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { IoIosHome } from "react-icons/io";
import { useState } from "react";
import DepositInputButtons from "../../ui/DepositInputButtons";
import {
  useCreateATransaction,
  useDepositWithToken,
  useMoneyFromBalance,
} from "../../features/transaction/useTransaction";
import toast from "react-hot-toast";
import { EarthLock } from "lucide-react";
import TokenDeposits from "../../ui/TokenDeposits";
import MoveFromBalance from "../../ui/MoveFromBalance";
import { useQueryClient } from "@tanstack/react-query";

const StyledContainerHelper = styled.div`
  height: 100vh;
  padding-bottom: 0rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledDeposit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0rem 1rem;
`;

const StyledIntroductionContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;
  align-items: center;

  background-color: var(--color-grey-0);
  border-radius: 9px;
  box-shadow: 0px 0px 4px #00000018;
  padding: 1rem 1rem;

  cursor: pointer;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          border: 1.5px solid var(--color-brand-800);
        `
      : css``}
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background-color: var(--color-brand-100);
  border-radius: 50%;

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-800);
  }
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    font-size: 1.6rem;
    color: var(--color-grey-900);
  }

  & span {
    font-size: 1rem;
    color: var(--color-grey-500);
  }
`;

const DepositContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 100vw;
  overflow: hidden;
`;

function Deposit() {
  const [depositType, setDepositType] = useState("transfer");
  const queryClient = useQueryClient();

  const [tokenDepositMessage, setTokenDepositMessage] = useState("");

  const [moveMoneyMessage, setMoveMoneyMessage] = useState("");

  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const { fullName, expenseBal, balance } = useUser();

  const { createTransaction, isPending: isCreating } = useCreateATransaction();
  const { tokenDposit, isTokenDeposit } = useDepositWithToken();

  const { moveMoneyFromBalance, isMovingMoney } = useMoneyFromBalance();

  function handleCreateDeposit() {
    if (!amount) {
      toast.error("Click or select a bank and amount");

      return;
    }

    const newTransaction = {
      amount: parseInt(amount?.replace(/,/g, "")?.split(".")[0], 10),
      userFullName: fullName,
    };

    createTransaction(newTransaction, {
      onSuccess: (data) => {
        const { id } = data[0];
        queryClient.invalidateQueries();

        navigate(`/app/Deposit_card-type/${id}`, { replace: true });
      },
    });
  }

  function handleDepositToken(token, tokenKey) {
    const newData = {
      token,
      tokenKey,
      userFullName: fullName,
    };

    tokenDposit(newData, {
      onError: (err) => {
        setTokenDepositMessage({ type: "error", message: err.message });
      },
      onSuccess: (data) => {
        setTokenDepositMessage({ type: "success", data: data[0] });
        queryClient.invalidateQueries();
      },
    });
  }

  function handleMoveMoney(amount) {
    const newData = {
      amount,
      userFullName: fullName,
    };

    moveMoneyFromBalance(newData, {
      onError: (err) => {
        setMoveMoneyMessage({ type: "error", message: err.message });
      },
      onSuccess: (data) => {
        setMoveMoneyMessage({ type: "success", data: data[0] });
        queryClient.invalidateQueries();
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack text={"Add Money"} />

      <StyledContainerHelper>
        <StyledDeposit>
          <StyledIntroductionContainer
            $isActive={depositType === "transfer" ? "true" : "false"}
            onClick={() => setDepositType("transfer")}
          >
            <SVGContainer>
              <IoIosHome />
            </SVGContainer>

            <ContentHeaderContainer>
              <p>Bank Transfer </p>
              <span>
                Select any bank below, provide an amount to make your deposit.
              </span>
            </ContentHeaderContainer>
          </StyledIntroductionContainer>

          <StyledIntroductionContainer
            $isActive={depositType === "token" ? "true" : "false"}
            onClick={() => setDepositType("token")}
          >
            <SVGContainer>
              <EarthLock />
            </SVGContainer>

            <ContentHeaderContainer>
              <p>Token Deposit</p>
              <span>Got a token? Tap here to proceed with deposit.</span>
            </ContentHeaderContainer>
          </StyledIntroductionContainer>

          <StyledIntroductionContainer
            $isActive={depositType === "local" ? "true" : "false"}
            onClick={() => setDepositType("local")}
          >
            <SVGContainer>
              <EarthLock />
            </SVGContainer>

            <ContentHeaderContainer>
              <p>Move from Balance</p>
              <span>Got a token? Tap here to proceed with deposit.</span>
            </ContentHeaderContainer>
          </StyledIntroductionContainer>

          <DepositContainer>
            <DepositInputButtons
              showButtons={depositType === "transfer" ? true : false}
              amount={amount}
              setAmount={setAmount}
              onSubmitData={handleCreateDeposit}
              isWorking={isCreating}
            />

            <TokenDeposits
              showButtons={depositType === "token" ? true : false}
              tokenDepositMessage={tokenDepositMessage}
              handleDepositToken={handleDepositToken}
              isWorking={isTokenDeposit}
            />

            <MoveFromBalance
              showButtons={depositType === "local" ? true : false}
              currentDepositType={depositType}
              moveMoneyMessage={moveMoneyMessage}
              handleMoveMoney={handleMoveMoney}
              balance={balance}
              expenseBal={expenseBal}
              isWorking={isMovingMoney}
            />
          </DepositContainer>
        </StyledDeposit>
      </StyledContainerHelper>
    </>
  );
}

export default Deposit;
