import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createATransaction,
  getATransaction,
  getAllTransactions,
  getMyTransactions,
  handleDepositWithToken,
  handleMakeWithdrawal,
  handleMoveMoney,
  updateATransaction,
} from "../../services/apiTransactions";

export function useCreateATransaction() {
  const { mutate: createTransaction, isPending } = useMutation({
    mutationFn: createATransaction,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createTransaction, isPending };
}

export function useGetATransaction(id) {
  const { data: aTransactions, isLoading } = useQuery({
    queryFn: () => getATransaction(id),

    queryKey: ["a_transactions", id],
  });

  return { aTransactions, isLoading };
}

export function useGetAllMyTransaction(userId) {
  const { data, isLoading } = useQuery({
    queryFn: () => getMyTransactions("userId"),

    queryKey: ["my_transactions", userId],
  });

  return {
    page: data?.page,
    perPage: data?.perPage,
    total: data?.total,
    totalEarnings: data?.totalEarnings,
    totalSpent: data?.totalSpent,
    allMyTransactions: data?.transactions,
    isLoading,
  };
}

export function useUpdateTransaction() {
  const { mutate: updateTransction, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) => updateATransaction(id, updatedData),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateTransction, isPending };
}

export function useGetAllTransactions() {
  const { data: allUserTransaction, isLoading } = useQuery({
    queryFn: () => getAllTransactions(),

    queryKey: ["all_user_transactions"],
  });

  return { allUserTransaction, isLoading };
}

export function useMoneyFromBalance() {
  const { mutate: moveMoneyFromBalance, isPending: isMovingMoney } =
    useMutation({
      mutationFn: handleMoveMoney,

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { moveMoneyFromBalance, isMovingMoney };
}

export function useDepositWithToken() {
  const { mutate: tokenDposit, isPending: isTokenDeposit } = useMutation({
    mutationFn: handleDepositWithToken,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { tokenDposit, isTokenDeposit };
}

export function useMakeWithdrawals() {
  const { mutate: makeWithdrawal, isPending: isWithdrawing } = useMutation({
    mutationFn: handleMakeWithdrawal,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { makeWithdrawal, isWithdrawing };
}
