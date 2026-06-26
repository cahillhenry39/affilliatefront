import styled from "styled-components";
import useUser from "../../features/authentication/useUser";
import WithdrawalHeaderAccount from "../../features/withdrawal/WithdrawalHeaderAccount";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import WithdrawalButtons from "../../features/withdrawal/WithdrawalButtons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMakeWithdrawals } from "../../features/transaction/useTransaction";
import { useQueryClient } from "@tanstack/react-query";
import WithdrawalTips from "../../features/withdrawal/WithdrawalTips";

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

  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();
  const { personalData, balance, bankAccount, bankName, currentPercentage } =
    useUser();

  const { makeWithdrawal, isWithdrawing } = useMakeWithdrawals();
  const isWorking = isWithdrawing;

  function handleMakeWithdrawal() {
    const formatedAount = parseInt(
      amount?.replace(/,/g, "")?.split(".")[0],
      10
    );

    if (+balance < +formatedAount) {
      toast.error("Oops... Insufficient balance.");
      return;
    }

    if (currentPercentage < 100) {
      toast.error("Oops... you are ineligible to make withdrawal.");
      return;
    }

    const newData = {
      amount: formatedAount,
    };

    makeWithdrawal(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("You have successfully place your withdrawal");
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
          personalData={personalData}
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
