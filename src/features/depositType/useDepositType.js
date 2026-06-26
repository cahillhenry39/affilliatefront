import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createANewBanks,
  deleteABank,
  getADepositBank,
  getAllAvailableBank,
  getAllDepositBank,
  updateABank,
} from "../../services/apiBankDeposit";
import toast from "react-hot-toast";

export function useGetAllDepositBank() {
  const { data: allDepositBank, isLoading } = useQuery({
    queryFn: getAllDepositBank,

    queryKey: ["all_deposit_bank"],
  });

  return { allDepositBank, isLoading };
}

export function useGetAllAvailableBank() {
  const { data: allAvailableBank, isLoading: isFetchingBank } = useQuery({
    queryFn: getAllAvailableBank,

    queryKey: ["all_available_banks"],
  });

  return { allAvailableBank, isFetchingBank };
}

export function useGetADepositBank(id) {
  const { data: depositBank, isLoading } = useQuery({
    queryFn: () => getADepositBank(id),

    queryKey: ["a_deposit_bank", id],
  });

  return { depositBank, isLoading };
}

export function useCreateABank() {
  const { mutate: createNewBank, isPending } = useMutation({
    mutationFn: createANewBanks,

    onError: (err) => toast.error(err.message),
  });

  return { createNewBank, isPending };
}

export function useUpdateABank() {
  const { mutate: updatedBank, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) => updateABank(id, updatedData),

    onError: (err) => toast.error(err.message),
  });

  return { updatedBank, isPending };
}

export function useDeleteBank() {
  const { mutate: deleteBank, isPending } = useMutation({
    mutationFn: deleteABank,

    onError: (err) => toast.error(err.message),
  });

  return { deleteBank, isPending };
}
