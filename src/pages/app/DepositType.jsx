import styled from "styled-components";
import Button from "../../ui/Button";
import TimerAndBankAndRef from "../../features/depositType/TimerAndBankAndRef";
import DepositInstructions from "../../features/depositType/DepositInstructions";
import { useState } from "react";
import { HiMiniBanknotes } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetATransaction,
  useUpdateTransaction,
} from "../../features/transaction/useTransaction";
import SpinnerAndText from "../../ui/SpinnerAndText";
import TransactionError from "../../ui/TransactionError";
import HeaderTitleTop from "../../ui/HeaderTitleTop";
import TaskLoader from "../../features/task/TaskLoader";

const StyledDepositType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 4rem;

  overflow-y: scroll;
  height: 90vh;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

function DepositType() {
  const navigate = useNavigate();
  const [transactionError, setTransactionError] = useState(false);

  const { id } = useParams();

  const { aTransactions, isLoading } = useGetATransaction(id);

  const { updateTransction, isPending: isUpdating } = useUpdateTransaction();

  function handleFinishTransaction() {
    const updatedData = {
      isSubmitted: true,
    };
    updateTransction(
      {
        id,
        updatedData,
      },
      {
        onSuccess: (data) => {
          const { id } = data[0];
          navigate(
            `/app/deposit_successful/${id}?ref=${aTransactions.reference}`
          );
        },
      }
    );
  }

  return (
    <>
      <HeaderTitleTop text={"Deposit Transaction"} icon={<HiMiniBanknotes />} />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <>
          <StyledDepositType>
            {transactionError ? (
              <TransactionError
                headerMessage="Transaction Terminated"
                footerMessage="It seems you could not complete this deposit transaction."
                generalButton={true}
                buttonHome={true}
                linkHome="/app"
              />
            ) : (
              <>
                <TimerAndBankAndRef
                  transactionDdetails={aTransactions}
                  setTransactionError={setTransactionError}
                />

                <DepositInstructions />

                <Button type="primary" onClick={handleFinishTransaction}>
                  {isUpdating ? (
                    <SpinnerAndText message="processing" />
                  ) : (
                    "I Have made this payment"
                  )}
                </Button>
              </>
            )}
          </StyledDepositType>
        </>
      )}
    </>
  );
}

export default DepositType;
