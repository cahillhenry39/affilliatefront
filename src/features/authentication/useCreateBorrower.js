import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  createAAppliedBorrower,
  deleteAppliedBorrwer as deleteAppliedBorrwerApi,
  getAllAppliedBorrower,
  getOneAppliedBorrower,
  updateAAppliedBorrower,
} from "../../services/apiBorrowerRegistration";

export function useGetAllAppliedBorrower() {
  const { data: allAppliedBorrower, isLoading } = useQuery({
    queryFn: getAllAppliedBorrower,
    queryKey: ["allAppliedBorrower"],
  });

  return { allAppliedBorrower, isLoading };
}

export function useGetAAppliedBorrower(id) {
  const { data: aAppliedBorrower, isLoading } = useQuery({
    queryFn: () => getOneAppliedBorrower(id),
    queryKey: ["aAppliedBorrower"],
  });

  return { aAppliedBorrower, isLoading };
}

export function useCreateAppliedBorrower() {
  const { mutate: createAppliedBorrower, isPending } = useMutation({
    mutationFn: createAAppliedBorrower,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createAppliedBorrower, isPending };
}

export function useUpdateAppliedBorrower() {
  const queryClient = useQueryClient();

  const { mutate: updateAppliedBorrower, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) =>
      updateAAppliedBorrower(id, updatedData),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateAppliedBorrower, isPending };
}

export function useDeleteAppliedBorrower() {
  const queryClient = useQueryClient();

  const { mutate: deleteAppliedBorrwer, isPending } = useMutation({
    mutationFn: deleteAppliedBorrwerApi,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteAppliedBorrwer, isPending };
}
