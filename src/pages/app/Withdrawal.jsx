import styled from "styled-components";
import useUser from "../../features/authentication/useUser";
import WithdrawalHeaderAccount from "../../features/withdrawal/WithdrawalHeaderAccount";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import WithdrawalButtons from "../../features/withdrawal/WithdrawalButtons";
import { useState } from "react";
import { useMakeWithdrawals } from "../../features/transaction/useTransaction";
import { useQueryClient } from "@tanstack/react-query";
import WithdrawalTips from "../../features/withdrawal/WithdrawalTips";
import { useAlert } from "../../hooks/AlertContext";
import { formatCurrency } from "../../utils/helpers";

const StyledContainer = styled.div`
  overflow: hidden;
  height: 100vh;

  padding: 0rem 1.5rem 8rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

function Withdrawal() {
  const [showTips, setShowTips] = useState(false);
  const { showAlert } = useAlert();

  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();
  const { fullName, balance, bankAccount, bankName, currentPercentage } =
    useUser();

  const { makeWithdrawal, isWithdrawing } = useMakeWithdrawals();
  const isWorking = isWithdrawing;

  const disableWithdrawalButton =
    !amount ||
    currentPercentage < 100 ||
    !bankName ||
    !bankAccount ||
    !fullName;

  function handleMakeWithdrawal() {
    if (disableWithdrawalButton) {
      showAlert({
        status: "error",
        text: "Provide amount or make sure your bank information is correct",
      });

      return;
    }

    const formatedAount = parseInt(
      amount?.replace(/,/g, "")?.split(".")[0],
      10,
    );

    if (+balance < +formatedAount) {
      showAlert({
        status: "error",
        text: "Oops... Insufficient balance.",
      });

      return;
    }

    if (currentPercentage < 100) {
      showAlert({
        status: "error",
        text: "Oops... you are ineligible to make withdrawal.",
      });
      return;
    }

    const newData = {
      amount: formatedAount,
    };

    makeWithdrawal(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries();

        showAlert({
          status: "success",
          text: `Congrats! You have successfully place a ${formatCurrency(formatedAount)} withdrawal. It will arrive within 1hr.`,
          link: "/app/finance",
          buttonMessage: "Check Status",
        });
      },

      onError: (err) => {
        showAlert({
          status: "error",
          text: err?.message,
        });
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack
        text={"Withdraw Money"}
        setShowRules={setShowTips}
        modalTitle={"Tips"}
      />

      <StyledContainer>
        <WithdrawalHeaderAccount
          fullName={fullName}
          bankAccount={bankAccount}
          bankName={bankName}
          balance={balance}
        />

        <WithdrawalButtons
          amount={amount}
          setAmount={setAmount}
          isWorking={isWorking}
          onSubmitData={handleMakeWithdrawal}
          currentPercentage={currentPercentage}
          disableWithdrawalButton={disableWithdrawalButton}
        />
      </StyledContainer>

      <WithdrawalTips
        showMini={showTips}
        setShowMini={() => setShowTips(false)}
      />
    </>
  );
}

export default Withdrawal;
