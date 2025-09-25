import HeaderNavigationBack from "../../ui/HeaderNavigationBack";

import { useParams } from "react-router-dom";
import { useGetATransaction } from "../../features/transaction/useTransaction";
import TaskLoader from "../../features/task/TaskLoader";
import SingleDepositBody from "../../features/desposit/SingleDepositBody";

function SingleTransactionPage() {
  const { transactionId } = useParams();

  const { aTransactions, isLoading } = useGetATransaction(transactionId);

  return (
    <>
      <HeaderNavigationBack text={"Transactions Details"} />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <SingleDepositBody aTransactions={aTransactions} />
      )}
    </>
  );
}

export default SingleTransactionPage;
